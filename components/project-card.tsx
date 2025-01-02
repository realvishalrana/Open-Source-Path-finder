'use client';

import { Star, GitFork, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import type { Project } from "@/app/types";
import type { Project } from '@/app/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className='flex flex-col p-6'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>{project.name}</h3>
          <p className='text-sm text-muted-foreground mt-1'>by Test</p>
        </div>
      </div>
      <p className='mt-4 text-sm text-muted-foreground line-clamp-2'>{project.description}</p>
      <div className='mt-4 flex flex-wrap gap-2'>
        {project.tags.map((tag) => (
          <Badge key={tag} variant='secondary'>
            {tag}
          </Badge>
        ))}
      </div>
      <div className='mt-6 flex items-center gap-4 text-sm text-muted-foreground'>
        <div className='flex items-center'>
          <Star className='mr-1 h-4 w-4' />
          {project.stars.toLocaleString()}
        </div>
        <div className='flex items-center'>
          <GitFork className='mr-1 h-4 w-4' />
          {Math.floor(project.stars * 0.15).toLocaleString()}
        </div>
        <div className='flex items-center'>
          <MessageCircle className='mr-1 h-4 w-4' />
          {project.issues}
        </div>
      </div>
      <div className='mt-6 flex items-center justify-between'>
        <Badge variant='outline'>{project.difficulty}</Badge>
        <Button size='sm' asChild>
          <a href={project.repository} target='_blank' rel='noopener noreferrer'>
            View Project
            <ArrowUpRight className='ml-2 h-4 w-4' />
          </a>
        </Button>
      </div>
    </Card>
  );
}
