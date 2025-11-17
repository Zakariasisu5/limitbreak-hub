import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Skeleton } from "@/components/ui/skeleton";

export const Leaderboard = () => {
  const { leaderboard, loading } = useLeaderboard(5);
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-400" />;
      default:
        return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">Top Learners</CardTitle>
            <CardDescription>See who's mastering security skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))
            ) : leaderboard.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No leaderboard data yet. Complete quizzes to earn points!
              </p>
            ) : (
              leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 flex items-center justify-center">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div>
                    <p className="font-semibold">{entry.username}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{entry.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
              ))
            )}
            <div className="pt-4 text-center">
              <Button variant="outline" asChild>
                <Link to="/profile">View Full Leaderboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
