// Existing types...

export interface DiscordServer {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string | null;
  inviteCode: string;
}

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  difficulty: string;
  language: string[];
  repository: string;
  issues: number;
  stars: number;
  lastUpdated: string;
  maintainer: string | null; // Add this line
}
