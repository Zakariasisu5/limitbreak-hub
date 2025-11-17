import { Button } from "@/components/ui/button";
import { Shield, Zap, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Hero = () => {
  const { user, signOut } = useAuth();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Learn. Earn. Stay Secure.</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Own your security.{" "}
            <span className="text-primary">Learn fast.</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Unlock more
            </span>{" "}
            with LimitBreakToken.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Master cybersecurity through interactive lessons, earn points, and unlock premium content with your LimitBreakToken.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            {user ? (
              <>
                <Button size="lg" variant="hero" asChild className="w-full sm:w-auto">
                  <Link to="/profile">My Profile</Link>
                </Button>
                <Button size="lg" variant="outline-light" asChild className="w-full sm:w-auto">
                  <Link to="/content">Explore Posts</Link>
                </Button>
                <Button size="lg" variant="outline" onClick={signOut} className="w-full sm:w-auto">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" variant="hero" asChild className="w-full sm:w-auto">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button size="lg" variant="outline-light" asChild className="w-full sm:w-auto">
                  <Link to="/content">Explore Posts</Link>
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Learn Security</h3>
              <p className="text-sm text-muted-foreground text-center">
                Interactive modules on phishing, MFA, and privacy
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Earn Points</h3>
              <p className="text-sm text-muted-foreground text-center">
                Complete quizzes and earn points for each achievement
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Unlock Premium</h3>
              <p className="text-sm text-muted-foreground text-center">
                Hold tokens to access advanced drills and rewards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};
