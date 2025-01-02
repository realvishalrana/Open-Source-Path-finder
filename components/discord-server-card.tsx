'use client';

import { Users, Link as LinkIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface DiscordServerProps {
  server: {
    name: string;
    description: string;
    memberCount: number;
    icon: string | null;
    inviteCode: string;
  };
}

export function DiscordServerCard({ server }: DiscordServerProps) {
  return (
    <Card className='flex flex-col p-6'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-12 w-12'>
          {server.icon ? (
            <AvatarImage src={server.icon} alt={server.name} />
          ) : (
            <AvatarFallback>{server.name.slice(0, 2)}</AvatarFallback>
          )}
        </Avatar>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold'>{server.name}</h3>
          <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>{server.description}</p>
        </div>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div className='flex items-center text-sm text-muted-foreground'>
          <Users className='mr-1 h-4 w-4' />
          {server.memberCount.toLocaleString()} members
        </div>
        <Button size='sm' asChild>
          <a
            href={`https://discord.gg/${server.inviteCode}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Join Server
            <LinkIcon className='ml-2 h-4 w-4' />
          </a>
        </Button>
      </div>
    </Card>
  );
}
