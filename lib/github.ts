import { Octokit } from '@octokit/rest';
import { getCached, setCache } from './cache';
import type { GitHubUser, Project } from '@/app/types';

interface SearchFilters {
  languages?: string[];
  difficulty?: string;
  tags?: string[];
}

// Create Octokit instance without token initially
let octokit = new Octokit();

// Function to update Octokit instance with token
export function updateGitHubToken(token: string) {
  octokit = new Octokit({ auth: token });
}

const API_DELAY = 100;
let lastApiCall = 0;

async function throttledRequest<T>(cacheKey: string, request: () => Promise<T>): Promise<T> {
  const cached = getCached<T>(cacheKey);
  if (cached) return cached;

  const now = Date.now();
  const timeToWait = Math.max(0, API_DELAY - (now - lastApiCall));
  if (timeToWait > 0) {
    await new Promise((resolve) => setTimeout(resolve, timeToWait));
  }

  try {
    const data = await request();
    setCache(cacheKey, data);
    lastApiCall = Date.now();
    return data;
  } catch (error: any) {
    if (error?.status === 403) {
      throw new Error(
        'GitHub API rate limit exceeded. Please sign in with GitHub to increase the limit.',
      );
    }
    if (error?.status === 401) {
      throw new Error('GitHub authentication required. Please sign in to continue.');
    }
    throw error;
  }
}

function buildSearchQuery(query: string, filters: SearchFilters): string {
  const parts = [query || 'stars:>1000'];

  if (filters.languages?.length) {
    parts.push(`language:${filters.languages.join(' language:')}`);
  }

  if (filters.tags?.length) {
    parts.push(`topic:${filters.tags.join(' topic:')}`);
  }

  if (filters.difficulty === 'beginner') {
    parts.push('label:good-first-issue');
  }

  return parts.join(' ');
}

export async function searchRepositories(
  query: string,
  filters: SearchFilters,
): Promise<Project[]> {
  const q = buildSearchQuery(query, filters);
  const cacheKey = `search:${q}`;

  try {
    return await throttledRequest(cacheKey, async () => {
      const response = await octokit.search.repos({
        q,
        sort: 'stars',
        per_page: 100,
        page: 1,
      });
      return response.data.items.map(transformGithubRepo);
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<GitHubUser | null> {
  try {
    const response = await octokit.users.getAuthenticated();
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

function transformGithubRepo(repo: any): Project {
  return {
    id: repo.id.toString(),
    name: repo.name,
    description: repo.description || 'No description available',
    tags: repo.topics || [],
    difficulty: repo.labels?.includes('good-first-issue') ? 'beginner' : 'intermediate',
    language: repo.language ? [repo.language] : [],
    repository: repo.html_url,
    maintainer: repo.owner?.login || null, // Set the maintainer to the owner's login
    issues: repo.open_issues_count, // Assign the number of open issues
    stars: repo.stargazers_count,
    lastUpdated: repo.updated_at,
  };
}

export async function fetchProjects(page: number): Promise<Project[]> {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=stars:>1000&sort=stars&per_page=30&page=${page}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data = await response.json();
  return data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    stars: item.stargazers_count,
    language: item.language,
  }));
}
