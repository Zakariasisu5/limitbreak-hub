import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  id: string;
}

export const useLeaderboard = (limit: number = 10) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, points')
        .order('points', { ascending: false })
        .limit(limit);

      if (!error && data) {
        const rankedData = data.map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));
        setLeaderboard(rankedData);
      }
      setLoading(false);
    };

    fetchLeaderboard();

    // Subscribe to profile changes to update leaderboard in real-time
    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit]);

  return { leaderboard, loading };
};
