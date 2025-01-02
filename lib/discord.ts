import { getCached, setCache } from './cache';

export interface DiscordServer {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string | null;
  inviteCode: string;
}

const DISCORD_API = 'https://discord.com/api/v10';

export async function searchDiscordServers(query: string): Promise<DiscordServer[]> {
  const cacheKey = `discord:${query}`;
  const cached = getCached<DiscordServer[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(`${DISCORD_API}/guilds/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bot ${process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN}`,
      },
      mode: 'no-cors',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Discord servers');
    }

    const data = await response.json();
    const servers: DiscordServer[] = data.map((server: any) => ({
      id: server.id,
      name: server.name,
      description: server.description || '',
      memberCount: server.approximate_member_count,
      icon: server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png` : null,
      inviteCode: server.instant_invite,
    }));

    setCache(cacheKey, servers);
    return servers;
  } catch (error) {
    console.error('Error fetching Discord servers:', error);
    return [];
  }
}
