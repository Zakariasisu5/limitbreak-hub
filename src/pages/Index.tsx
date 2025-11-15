import { Hero } from "@/components/Hero";
import { ModuleCard } from "@/components/ModuleCard";
import { Leaderboard } from "@/components/Leaderboard";
import { Footer } from "@/components/Footer";

const featuredModules = [
  {
    title: "Phishing 101",
    description: "Learn to identify and prevent phishing attacks in your daily digital life.",
    category: "Phishing Defense",
    difficulty: "beginner" as const,
    timeToRead: "12 min",
    slug: "phishing-101",
  },
  {
    title: "MFA Mastery",
    description: "Master multi-factor authentication and secure your accounts like a pro.",
    category: "Authentication",
    difficulty: "intermediate" as const,
    timeToRead: "15 min",
    slug: "mfa-mastery",
  },
  {
    title: "Privacy Basics",
    description: "Protect your personal data and maintain privacy in the digital age.",
    category: "Privacy & Data",
    difficulty: "beginner" as const,
    timeToRead: "10 min",
    slug: "privacy-basics",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      <section id="featured-modules" className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Modules</h2>
            <p className="text-xl text-muted-foreground">
              Start your security journey with these essential lessons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModules.map((module) => (
              <ModuleCard key={module.slug} {...module} />
            ))}
          </div>
        </div>
      </section>

      <Leaderboard />

      <section id="how-it-works" className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Your journey to cybersecurity mastery in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-semibold">Connect & Verify</h3>
              <p className="text-muted-foreground">
                Connect your wallet and verify your Gmail to create your secure profile
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="text-xl font-semibold">Learn & Practice</h3>
              <p className="text-muted-foreground">
                Complete interactive modules and quizzes to build your security knowledge
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="text-xl font-semibold">Earn & Unlock</h3>
              <p className="text-muted-foreground">
                Earn points, climb the leaderboard, and unlock premium content with tokens
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
