'use client';

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DiscordServerCard } from '@/components/discord-server-card';
import { ProjectSkeleton } from '@/components/project-skeleton';
import { DiscordServer, searchDiscordServers } from '@/lib/discord';

interface DiscordServersProps {
  searchQuery: string;
}

export function DiscordServers({ searchQuery }: DiscordServersProps) {
  const [servers, setServers] = useState<DiscordServer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery) return;

    let mounted = true;
    const fetchServers = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await searchDiscordServers(searchQuery);
        if (mounted) {
          setServers(results);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to fetch Discord servers');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const debounceTimeout = setTimeout(fetchServers, 300);
    return () => {
      mounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery]);

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
        {Array.from({ length: 3 }).map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {servers.map((server) => (
        <DiscordServerCard key={server.id} server={server} />
      ))}
    </div>
  );
}
