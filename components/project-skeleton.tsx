'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProjectSkeleton() {
  return (
    <Card className='flex flex-col p-6'>
      <div className='flex items-start justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-4 w-32' />
        </div>
      </div>
      <div className='mt-4 space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-4/5' />
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className='h-6 w-16 rounded-full' />
        ))}
      </div>
      <div className='mt-6 flex items-center gap-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className='h-4 w-16' />
        ))}
      </div>
      <div className='mt-6 flex items-center justify-between'>
        <Skeleton className='h-6 w-24 rounded-full' />
        <Skeleton className='h-8 w-28' />
      </div>
    </Card>
  );
}
