import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Zap, Trophy, Star, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function TokenGate() {
  const benefits = [
    {
      icon: Lock,
      title: "Advanced Modules",
      description: "Access exclusive advanced security training and expert-level content",
    },
    {
      icon: Trophy,
      title: "Leaderboard Eligibility",
      description: "Compete for top positions and gain recognition in the community",
    },
    {
      icon: Star,
      title: "Seasonal Rewards",
      description: "Exclusive NFT badges and rewards for token holders each season",
    },
    {
      icon: Zap,
      title: "Priority Support",
      description: "Get faster responses and dedicated assistance from our team",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <div className="mb-8">
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-2 mb-4">
            ← Back to home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Banner */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unlock Premium Features
            </h1>
            <p className="text-xl text-muted-foreground">
              Hold 1 LimitBreakToken to access advanced drills and exclusive rewards
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Token Info Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 shadow-hover mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">LimitBreakToken</CardTitle>
              <CardDescription className="text-base">
                Your key to advanced cybersecurity education
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <p>One-time purchase, lifetime access</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <p>Transferable NFT on Ethereum network</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <p>Growing value as community expands</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <p>Access to exclusive token-holder events</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" variant="hero" className="flex-1">
                  Mint Token (0.05 ETH)
                </Button>
                <Button size="lg" variant="outline-light" className="flex-1">
                  Buy on OpenSea
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Don't have a wallet?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Connect one here
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What if I sell my token?</h3>
                <p className="text-sm text-muted-foreground">
                  Your access to premium features is tied to token ownership. If you sell or transfer
                  your token, you'll lose access to token-gated content.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I use one token for multiple accounts?</h3>
                <p className="text-sm text-muted-foreground">
                  No, tokens are verified per wallet address. Each account must have its own token
                  to access premium features.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a limited supply?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, LimitBreakToken has a capped supply of 10,000 tokens. Once sold out, tokens
                  will only be available on secondary markets.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What blockchain is it on?</h3>
                <p className="text-sm text-muted-foreground">
                  LimitBreakToken is an ERC-721 NFT on the Ethereum mainnet, ensuring security and
                  wide compatibility with wallets and marketplaces.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
