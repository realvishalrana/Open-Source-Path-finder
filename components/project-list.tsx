'use client';

import { FC, useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProjectCard } from '@/components/project-card';
import { ProjectSkeleton } from '@/components/project-skeleton';
import type { Project } from '@/app/types';
import { searchRepositories } from '@/lib/github';

interface ProjectListProps {
  searchQuery: string;
  selectedTags: string[];
  difficulty?: string;
  language?: string;
}

export const ProjectList: FC<ProjectListProps> = ({
  searchQuery,
  selectedTags,
  difficulty,
  language,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const filters = {
          languages: language ? [language] : undefined,
          difficulty,
          tags: selectedTags,
        };

        const repos = await searchRepositories(searchQuery, filters);

        if (mounted) {
          setProjects(repos);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to fetch projects');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const debounceTimeout = setTimeout(fetchProjects, 300);
    return () => {
      mounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery, selectedTags, difficulty, language]);

  if (error) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
