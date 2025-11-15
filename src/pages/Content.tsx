import { useState } from "react";
import { ModuleCard } from "@/components/ModuleCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const allModules = [
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
  {
    title: "Advanced Threat Detection",
    description: "Deep dive into identifying sophisticated cyber threats and attack vectors.",
    category: "Advanced Security",
    difficulty: "advanced" as const,
    timeToRead: "25 min",
    slug: "advanced-threats",
    isTokenGated: true,
  },
  {
    title: "Password Security 2.0",
    description: "Modern password management strategies and tools for maximum security.",
    category: "Authentication",
    difficulty: "intermediate" as const,
    timeToRead: "18 min",
    slug: "password-security",
  },
  {
    title: "Social Engineering Defense",
    description: "Recognize and protect against social engineering tactics and manipulation.",
    category: "Phishing Defense",
    difficulty: "intermediate" as const,
    timeToRead: "20 min",
    slug: "social-engineering",
  },
];

export default function Content() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredModules = allModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || module.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "all" || module.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(allModules.map((m) => m.category)))];

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <div className="mb-8">
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-2 mb-4">
            ← Back to home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Modules</h1>
          <p className="text-xl text-muted-foreground">
            Master cybersecurity one module at a time
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Difficulties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredModules.length} of {allModules.length} modules
          </p>
        </div>

        {filteredModules.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No modules found matching your filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setCategoryFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <ModuleCard key={module.slug} {...module} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
