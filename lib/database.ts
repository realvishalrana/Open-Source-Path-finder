import { DiscordServer } from './discord';

// Mock database search function
export async function searchServersInDatabase(query: string): Promise<DiscordServer[]> {
  // Replace this with actual database search logic
  const mockDatabase: DiscordServer[] = [
    {
      id: '1',
      name: 'React Developers',
      description: 'A server for React developers',
      memberCount: 1000,
      icon: null,
      inviteCode: 'abc123',
    },
    {
      id: '2',
      name: 'JavaScript Enthusiasts',
      description: 'A server for JavaScript enthusiasts',
      memberCount: 500,
      icon: null,
      inviteCode: 'def456',
    },
  ];

  return mockDatabase.filter((server) => server.name.toLowerCase().includes(query.toLowerCase()));
}
