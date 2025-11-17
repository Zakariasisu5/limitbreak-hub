import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const quizQuestions = [
  {
    id: 1,
    question: "What is the most common type of phishing attack?",
    options: [
      "Email phishing",
      "SMS phishing (Smishing)",
      "Voice phishing (Vishing)",
      "Social media phishing",
    ],
    correctAnswer: 0,
    explanation: "Email phishing remains the most common type, accounting for over 90% of phishing attacks.",
  },
  {
    id: 2,
    question: "Which of the following is NOT a good password practice?",
    options: [
      "Using a password manager",
      "Enabling multi-factor authentication",
      "Using the same password for multiple accounts",
      "Creating passwords with 12+ characters",
    ],
    correctAnswer: 2,
    explanation: "Using the same password across multiple accounts is dangerous - if one account is breached, all are at risk.",
  },
  {
    id: 3,
    question: "What does MFA stand for?",
    options: [
      "Multiple File Authentication",
      "Multi-Factor Authentication",
      "Master File Access",
      "Managed Firewall Application",
    ],
    correctAnswer: 1,
    explanation: "MFA stands for Multi-Factor Authentication, a security method requiring two or more verification factors.",
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [saving, setSaving] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
      
      // Save score to database if user is logged in
      if (user) {
        setSaving(true);
        const pointsEarned = score * 50;
        const { error } = await supabase
          .from('quiz_scores')
          .insert({
            user_id: user.id,
            score,
            total_questions: quizQuestions.length,
            points_earned: pointsEarned,
          });
        
        if (error) {
          toast({
            title: "Error saving score",
            description: "Your score couldn't be saved, but you still earned the points!",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Score saved!",
            description: `You earned ${pointsEarned} points!`,
          });
        }
        setSaving(false);
      }
    }
  };

  if (isComplete) {
    const pointsEarned = score * 50;
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            <CardDescription>Here's how you did</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-6 rounded-lg bg-background/50 border border-primary/10">
                <p className="text-3xl font-bold text-primary">{score}/{quizQuestions.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Correct Answers</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50 border border-primary/10">
                <p className="text-3xl font-bold text-primary">{percentage.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground mt-1">Score</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50 border border-primary/10">
                <p className="text-3xl font-bold text-primary">+{pointsEarned}</p>
                <p className="text-sm text-muted-foreground mt-1">Points Earned</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recommended Next Steps</h3>
              <div className="space-y-2">
                <Link
                  to="/content/mfa-mastery"
                  className="block p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-all"
                >
                  <p className="font-semibold">Continue to MFA Mastery</p>
                  <p className="text-sm text-muted-foreground">Level up your authentication knowledge</p>
                </Link>
                <Link
                  to="/content"
                  className="block p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-all"
                >
                  <p className="font-semibold">Browse All Modules</p>
                  <p className="text-sm text-muted-foreground">Explore more security topics</p>
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                Retake Quiz
              </Button>
              {user ? (
                <Button variant="default" onClick={() => navigate("/profile")} className="flex-1" disabled={saving}>
                  {saving ? 'Saving...' : 'View Profile'}
                </Button>
              ) : (
                <Button variant="default" onClick={() => navigate("/auth")} className="flex-1">
                  Sign Up to Save Progress
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/content" className="text-primary hover:underline">
            ← Exit Quiz
          </Link>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-right">{progress.toFixed(0)}% Complete</p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showCorrect
                        ? "bg-green-500/20 border-green-500"
                        : showIncorrect
                        ? "bg-red-500/20 border-red-500"
                        : isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-background/50 border-primary/10 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      {showIncorrect && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div
                className={`p-4 rounded-lg ${
                  selectedAnswer === question.correctAnswer
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-red-500/10 border border-red-500/30"
                }`}
              >
                <p className="font-semibold mb-2">
                  {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full"
                  size="lg"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} className="w-full" size="lg">
                  {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "View Results"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
