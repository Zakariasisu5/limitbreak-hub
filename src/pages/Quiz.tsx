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
    category: "Phishing",
    difficulty: "easy",
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
    category: "Passwords",
    difficulty: "easy",
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
    category: "Authentication",
    difficulty: "easy",
  },
  {
    id: 4,
    question: "What is the primary purpose of a firewall?",
    options: [
      "To encrypt data",
      "To monitor and control network traffic",
      "To backup files",
      "To compress data",
    ],
    correctAnswer: 1,
    explanation: "A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules.",
    category: "Network Security",
    difficulty: "medium",
  },
  {
    id: 5,
    question: "Which encryption standard is currently recommended for Wi-Fi security?",
    options: [
      "WEP",
      "WPA",
      "WPA2",
      "WPA3",
    ],
    correctAnswer: 3,
    explanation: "WPA3 is the latest and most secure Wi-Fi encryption standard, offering improved security over WPA2.",
    category: "Encryption",
    difficulty: "medium",
  },
  {
    id: 6,
    question: "What is ransomware?",
    options: [
      "Software that speeds up your computer",
      "Malware that encrypts files and demands payment",
      "A type of antivirus program",
      "A password manager",
    ],
    correctAnswer: 1,
    explanation: "Ransomware is malicious software that encrypts a victim's files, making them inaccessible until a ransom is paid.",
    category: "Malware",
    difficulty: "easy",
  },
  {
    id: 7,
    question: "What is a zero-day vulnerability?",
    options: [
      "A bug that was fixed yesterday",
      "A security flaw unknown to the software vendor",
      "A vulnerability that exists for zero days",
      "An outdated security patch",
    ],
    correctAnswer: 1,
    explanation: "A zero-day vulnerability is a security flaw that is unknown to the software vendor and has no available patch.",
    category: "Vulnerabilities",
    difficulty: "hard",
  },
  {
    id: 8,
    question: "What does VPN stand for?",
    options: [
      "Virtual Private Network",
      "Very Private Network",
      "Verified Public Network",
      "Virtual Protection Node",
    ],
    correctAnswer: 0,
    explanation: "VPN stands for Virtual Private Network, which creates a secure, encrypted connection over a less secure network.",
    category: "Network Security",
    difficulty: "easy",
  },
  {
    id: 9,
    question: "Which of these is an example of social engineering?",
    options: [
      "SQL injection",
      "DDoS attack",
      "Pretexting to gain unauthorized information",
      "Buffer overflow",
    ],
    correctAnswer: 2,
    explanation: "Social engineering involves manipulating people to divulge confidential information. Pretexting is creating a fabricated scenario to gain trust.",
    category: "Social Engineering",
    difficulty: "medium",
  },
  {
    id: 10,
    question: "What is the purpose of HTTPS?",
    options: [
      "To make websites load faster",
      "To secure data transmission between browser and server",
      "To block advertisements",
      "To store passwords",
    ],
    correctAnswer: 1,
    explanation: "HTTPS encrypts data transmitted between your browser and the web server, protecting it from eavesdropping.",
    category: "Web Security",
    difficulty: "easy",
  },
  {
    id: 11,
    question: "What is a brute force attack?",
    options: [
      "Physical damage to servers",
      "Trying many passwords until one works",
      "Overloading a server with traffic",
      "Installing malware through email",
    ],
    correctAnswer: 1,
    explanation: "A brute force attack involves systematically trying many passwords or passphrases until the correct one is found.",
    category: "Attack Types",
    difficulty: "medium",
  },
  {
    id: 12,
    question: "What is the principle of least privilege?",
    options: [
      "Users should have only the minimum access needed",
      "Everyone should have admin rights",
      "Passwords should be as short as possible",
      "Security measures should be minimal",
    ],
    correctAnswer: 0,
    explanation: "The principle of least privilege means users should have only the minimum levels of access needed to perform their job functions.",
    category: "Access Control",
    difficulty: "medium",
  },
  {
    id: 13,
    question: "What is SQL injection?",
    options: [
      "A medical procedure",
      "A code injection attack on databases",
      "A type of encryption",
      "A network protocol",
    ],
    correctAnswer: 1,
    explanation: "SQL injection is a code injection technique that exploits vulnerabilities in database-driven applications.",
    category: "Web Security",
    difficulty: "hard",
  },
  {
    id: 14,
    question: "What should you do if you receive a suspicious email?",
    options: [
      "Click all links to investigate",
      "Reply asking if it's legitimate",
      "Report it and delete it",
      "Forward it to all your contacts",
    ],
    correctAnswer: 2,
    explanation: "Suspicious emails should be reported to your IT department or email provider and then deleted without clicking any links.",
    category: "Phishing",
    difficulty: "easy",
  },
  {
    id: 15,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "Logging in twice",
      "Using two independent verification methods",
      "Having two user accounts",
    ],
    correctAnswer: 2,
    explanation: "2FA requires two independent authentication factors, typically something you know (password) and something you have (phone).",
    category: "Authentication",
    difficulty: "easy",
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
    
    // Calculate performance by difficulty
    const easyQuestions = quizQuestions.filter(q => q.difficulty === 'easy');
    const mediumQuestions = quizQuestions.filter(q => q.difficulty === 'medium');
    const hardQuestions = quizQuestions.filter(q => q.difficulty === 'hard');

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

            <p className="text-muted-foreground text-center mb-6">
              {percentage >= 80
                ? "Excellent work! You're a cybersecurity expert! 🎉"
                : percentage >= 60
                ? "Good job! Keep learning to improve your score. 📚"
                : "Keep practicing! Review the modules to strengthen your knowledge. 💪"}
            </p>
            
            <div className="grid gap-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Easy Questions</span>
                <span className="text-sm font-semibold text-green-500">{easyQuestions.length} questions</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Medium Questions</span>
                <span className="text-sm font-semibold text-yellow-500">{mediumQuestions.length} questions</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Hard Questions</span>
                <span className="text-sm font-semibold text-red-500">{hardQuestions.length} questions</span>
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
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                {question.category}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                question.difficulty === 'easy' ? 'bg-green-500/10 text-green-500' :
                question.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {question.difficulty.toUpperCase()}
              </span>
            </div>
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
