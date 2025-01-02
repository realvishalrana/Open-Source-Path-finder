'use client';

import { useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function GitHubAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async () => {
    setIsLoading(true);

    try {
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      if (!clientId) {
        throw new Error('GitHub Client ID is not configured');
      }

      const redirectUri = `${window.location.origin}/api/auth/callback/github`;
      const scope = 'read:user repo';

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope,
        state: Math.random().toString(36).substring(7),
      });

      window.location.href = `https://github.com/login/oauth/authorize?${params}`;
    } catch (error: any) {
      toast({
        title: 'Authentication Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant='outline' size='lg' onClick={handleAuth} disabled={isLoading}>
      <Github className='mr-2 h-4 w-4' />
      {isLoading ? 'Connecting...' : 'Connect GitHub'}
    </Button>
  );
}
