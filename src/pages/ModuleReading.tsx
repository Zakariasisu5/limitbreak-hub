import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Clock, BookOpen, Lightbulb, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";

const moduleContent: Record<string, {
  title: string;
  category: string;
  difficulty: string;
  timeToRead: string;
  content: Array<{ type: string; text: string }>;
}> = {
  "phishing-101": {
    title: "Phishing 101",
    category: "Phishing Defense",
    difficulty: "beginner",
    timeToRead: "12 min",
    content: [
      {
        type: "heading",
        text: "What is Phishing?",
      },
      {
        type: "paragraph",
        text: "Phishing is a type of cyber attack where attackers impersonate legitimate organizations to steal sensitive information such as passwords, credit card numbers, and personal data. These attacks typically arrive via email, but can also come through text messages, social media, or phone calls.",
      },
      {
        type: "heading",
        text: "Common Signs of Phishing",
      },
      {
        type: "paragraph",
        text: "Learning to recognize phishing attempts is your first line of defense. Here are the most common red flags:",
      },
      {
        type: "list",
        text: "• Urgent or threatening language • Requests for sensitive information • Suspicious sender addresses • Generic greetings like 'Dear Customer' • Poor grammar and spelling • Unexpected attachments or links",
      },
      {
        type: "tip",
        text: "Try this now: Check your email inbox and look for any suspicious messages. Practice identifying red flags before clicking any links.",
      },
      {
        type: "heading",
        text: "How to Protect Yourself",
      },
      {
        type: "paragraph",
        text: "Protection against phishing requires a combination of awareness and good security practices:",
      },
      {
        type: "list",
        text: "• Always verify the sender's email address • Hover over links to preview the destination • Enable multi-factor authentication • Never share passwords via email • Report suspicious emails to your IT department",
      },
      {
        type: "tip",
        text: "Try this now: Enable two-factor authentication on your most important accounts today. Start with email, banking, and social media.",
      },
    ],
  },
};

export default function ModuleReading() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const module = slug ? moduleContent[slug] : null;

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module not found</h1>
          <Button asChild>
            <Link to="/content">Back to Modules</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => {
      navigate("/quiz");
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/content" className="text-primary hover:underline inline-flex items-center gap-2 mb-4">
              ← Back to modules
            </Link>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{module.category}</Badge>
                <Badge
                  className={
                    module.difficulty === "beginner"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : module.difficulty === "intermediate"
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }
                >
                  {module.difficulty}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold mb-6">{module.title}</h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{module.timeToRead}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Interactive Lesson</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none space-y-6">
            {module.content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "paragraph") {
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed text-base">
                    {block.text}
                  </p>
                );
              }

              if (block.type === "list") {
                return (
                  <ul key={index} className="space-y-2 text-muted-foreground text-base">
                    {block.text.split("\n").map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">→</span>
                        <span>{item.replace("• ", "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "tip") {
                return (
                  <Card
                    key={index}
                    className="bg-primary/10 border-primary/30 shadow-card"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-primary mb-2">Try This Now</p>
                          <p className="text-sm text-muted-foreground">{block.text.replace("Try this now: ", "")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              return null;
            })}
          </div>

          <Card className="mt-12 bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Ready to Test Your Knowledge?</h3>
                <p className="text-muted-foreground">
                  Complete the quiz to earn points and unlock your next module
                </p>
                <Button
                  size="lg"
                  variant="hero"
                  onClick={handleComplete}
                  disabled={completed}
                  className="min-w-[200px]"
                >
                  {completed ? "Redirecting..." : "Start Quiz"} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
