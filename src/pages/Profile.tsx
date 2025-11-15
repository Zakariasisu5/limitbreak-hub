import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Trophy, Award, CheckCircle2, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Profile() {
  // Mock user data
  const user = {
    username: "CyberLearner",
    email: "learner@gmail.com",
    wallet: "0x742d...5e89",
    verified: true,
    hasToken: false,
    points: 450,
    rank: 12,
    badges: [
      { id: 1, name: "First Steps", icon: Shield, earned: true },
      { id: 2, name: "Phishing Expert", icon: Award, earned: true },
      { id: 3, name: "Quiz Master", icon: Trophy, earned: false },
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <div className="mb-8">
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-2 mb-4">
            ← Back to home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    {user.username}
                    {user.verified && (
                      <CheckCircle2 className="w-6 h-6 text-green-500" aria-label="Verified user" />
                    )}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {user.email} • {user.wallet}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-6 rounded-lg bg-background/50 border border-primary/10">
                  <p className="text-3xl font-bold text-primary">{user.points}</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Points</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-background/50 border border-primary/10">
                  <p className="text-3xl font-bold text-primary">#{user.rank}</p>
                  <p className="text-sm text-muted-foreground mt-1">Global Rank</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-background/50 border border-primary/10">
                  <p className="text-3xl font-bold text-primary">
                    {user.badges.filter((b) => b.earned).length}/{user.badges.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Badges Earned</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Token Status</h3>
                <div className="p-6 rounded-lg bg-background/50 border border-primary/20">
                  {user.hasToken ? (
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="font-semibold">Token Holder</p>
                        <p className="text-sm text-muted-foreground">
                          You have access to all premium features
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <Lock className="w-6 h-6 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-semibold mb-2">No Token Found</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Get a LimitBreakToken to unlock advanced modules and exclusive rewards
                        </p>
                        <Button variant="default" asChild>
                          <Link to="/token-gate">Get Token</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Your achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                      badge.earned
                        ? "bg-primary/10 border-primary/30"
                        : "bg-background/30 border-primary/10 opacity-50"
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="flex-1">
                      <p className="font-semibold">{badge.name}</p>
                      {badge.earned ? (
                        <Badge variant="outline" className="mt-1 text-xs border-green-500/30 text-green-400">
                          Earned
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="mt-1 text-xs">
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <Card className="mt-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="default" size="lg" asChild>
              <Link to="/content">Browse All Modules</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
