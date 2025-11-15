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
  "mfa-mastery": {
    title: "MFA Mastery",
    category: "Authentication",
    difficulty: "intermediate",
    timeToRead: "15 min",
    content: [
      {
        type: "heading",
        text: "Understanding Multi-Factor Authentication",
      },
      {
        type: "paragraph",
        text: "Multi-Factor Authentication (MFA) adds an extra layer of security by requiring two or more verification methods to access your accounts. Even if someone steals your password, they still can't access your account without the second factor.",
      },
      {
        type: "heading",
        text: "Types of Authentication Factors",
      },
      {
        type: "paragraph",
        text: "MFA combines multiple authentication categories:",
      },
      {
        type: "list",
        text: "• Something you know (password, PIN) • Something you have (phone, security key) • Something you are (fingerprint, face recognition) • Somewhere you are (location, network)",
      },
      {
        type: "heading",
        text: "MFA Methods Ranked by Security",
      },
      {
        type: "list",
        text: "• Hardware security keys (most secure) • Authenticator apps (Google Authenticator, Authy) • Push notifications to verified devices • SMS codes (least secure, but better than nothing) • Backup codes for recovery",
      },
      {
        type: "tip",
        text: "Try this now: Set up an authenticator app on your phone and enable MFA on at least three critical accounts: email, banking, and your primary social media.",
      },
      {
        type: "heading",
        text: "Best Practices",
      },
      {
        type: "list",
        text: "• Use authenticator apps instead of SMS when possible • Keep backup codes in a secure location • Never share MFA codes with anyone • Register multiple devices for backup access • Review and remove old devices from your accounts",
      },
      {
        type: "tip",
        text: "Try this now: Generate and securely store backup codes for your most important accounts. Keep them in a password manager or encrypted file.",
      },
    ],
  },
  "privacy-basics": {
    title: "Privacy Basics",
    category: "Privacy & Data",
    difficulty: "beginner",
    timeToRead: "10 min",
    content: [
      {
        type: "heading",
        text: "Why Privacy Matters",
      },
      {
        type: "paragraph",
        text: "Your personal data is valuable. Companies collect, analyze, and share your information to build detailed profiles about you. Understanding how to protect your privacy helps you maintain control over your digital identity and personal information.",
      },
      {
        type: "heading",
        text: "What Data Are You Sharing?",
      },
      {
        type: "paragraph",
        text: "Every day, you share data through various channels:",
      },
      {
        type: "list",
        text: "• Browsing history and search queries • Location data from mobile devices • Social media posts and interactions • Shopping habits and purchase history • App permissions on your devices • Email and messaging metadata",
      },
      {
        type: "heading",
        text: "Simple Privacy Protection Steps",
      },
      {
        type: "list",
        text: "• Use privacy-focused browsers and search engines • Review and limit app permissions regularly • Enable privacy settings on social media • Use a VPN on public WiFi networks • Clear cookies and browsing data periodically • Read privacy policies before signing up",
      },
      {
        type: "tip",
        text: "Try this now: Check your smartphone app permissions. Revoke location, camera, and microphone access for apps that don't need them.",
      },
      {
        type: "heading",
        text: "Data Minimization",
      },
      {
        type: "paragraph",
        text: "Only share what's necessary. Before providing personal information, ask yourself if it's required and what it will be used for.",
      },
      {
        type: "tip",
        text: "Try this now: Review your social media profiles and remove or hide personal details like your phone number, birthday, and current location.",
      },
    ],
  },
  "advanced-threats": {
    title: "Advanced Threat Detection",
    category: "Advanced Security",
    difficulty: "advanced",
    timeToRead: "25 min",
    content: [
      {
        type: "heading",
        text: "Understanding Advanced Persistent Threats",
      },
      {
        type: "paragraph",
        text: "Advanced Persistent Threats (APTs) are sophisticated, long-term cyber attacks where hackers gain unauthorized access and remain undetected for extended periods. Unlike opportunistic attacks, APTs are targeted, well-funded, and often state-sponsored.",
      },
      {
        type: "heading",
        text: "Attack Vectors and Techniques",
      },
      {
        type: "list",
        text: "• Spear phishing targeting specific individuals • Zero-day exploits in software vulnerabilities • Supply chain attacks compromising trusted vendors • Credential stuffing and password spraying • Man-in-the-middle attacks on networks • Fileless malware living in memory",
      },
      {
        type: "heading",
        text: "Indicators of Compromise",
      },
      {
        type: "paragraph",
        text: "Learn to recognize signs that your system may be compromised:",
      },
      {
        type: "list",
        text: "• Unusual network traffic patterns or data transfers • Unexpected system slowdowns or crashes • New user accounts or privilege escalations • Modified system files or registry entries • Disabled security software or logging • Connections to suspicious IP addresses",
      },
      {
        type: "tip",
        text: "Try this now: Review your network traffic logs and recent login attempts. Look for connections at unusual times or from unfamiliar locations.",
      },
      {
        type: "heading",
        text: "Defense Strategies",
      },
      {
        type: "list",
        text: "• Implement network segmentation and zero-trust architecture • Deploy endpoint detection and response (EDR) solutions • Maintain comprehensive logging and monitoring • Conduct regular security audits and penetration testing • Establish incident response procedures • Keep systems patched and updated",
      },
      {
        type: "heading",
        text: "Threat Intelligence",
      },
      {
        type: "paragraph",
        text: "Stay informed about emerging threats by following security advisories, participating in threat intelligence sharing communities, and monitoring indicators of compromise specific to your industry.",
      },
      {
        type: "tip",
        text: "Try this now: Subscribe to security mailing lists like US-CERT or your industry's information sharing and analysis center (ISAC).",
      },
    ],
  },
  "password-security": {
    title: "Password Security 2.0",
    category: "Authentication",
    difficulty: "intermediate",
    timeToRead: "18 min",
    content: [
      {
        type: "heading",
        text: "The Evolution of Password Security",
      },
      {
        type: "paragraph",
        text: "Traditional password advice (change every 90 days, use complex symbols) has been replaced by modern best practices that focus on length, uniqueness, and proper management. Understanding current password security is essential for protecting your digital life.",
      },
      {
        type: "heading",
        text: "What Makes a Strong Password",
      },
      {
        type: "list",
        text: "• Length over complexity (minimum 12-16 characters) • Unique for every account • No personal information or common words • Random combinations or passphrases • Never reused across services • Generated by password managers when possible",
      },
      {
        type: "tip",
        text: "Try this now: Create a passphrase using 4-5 random words. For example: 'coffee-bicycle-mountain-thunder' is stronger than 'P@ssw0rd123'.",
      },
      {
        type: "heading",
        text: "Password Managers",
      },
      {
        type: "paragraph",
        text: "Password managers are essential tools that generate, store, and auto-fill complex passwords. Popular options include Bitwarden, 1Password, LastPass, and KeePass.",
      },
      {
        type: "list",
        text: "• Generates unique passwords for each account • Syncs across all your devices • Auto-fills credentials securely • Stores secure notes and documents • Alerts you to compromised passwords • Simplifies password sharing with teams",
      },
      {
        type: "tip",
        text: "Try this now: Choose a reputable password manager and start by importing your existing passwords. Then gradually replace weak passwords with strong, unique ones.",
      },
      {
        type: "heading",
        text: "Handling Password Breaches",
      },
      {
        type: "paragraph",
        text: "When a service you use is breached, act quickly:",
      },
      {
        type: "list",
        text: "• Change the password immediately • Check if you reused it elsewhere and update those • Enable MFA if not already active • Monitor your accounts for suspicious activity • Consider using a monitoring service like Have I Been Pwned",
      },
      {
        type: "heading",
        text: "Common Mistakes to Avoid",
      },
      {
        type: "list",
        text: "• Writing passwords on sticky notes • Saving passwords in browser without master password • Using 'forgot password' as your authentication method • Sharing passwords over email or messaging • Using keyboard patterns (qwerty, 12345) • Changing just one character in old passwords",
      },
      {
        type: "tip",
        text: "Try this now: Visit haveibeenpwned.com and check if your email addresses have been involved in any data breaches. Update passwords for any compromised accounts.",
      },
    ],
  },
  "social-engineering": {
    title: "Social Engineering Defense",
    category: "Phishing Defense",
    difficulty: "intermediate",
    timeToRead: "20 min",
    content: [
      {
        type: "heading",
        text: "What is Social Engineering?",
      },
      {
        type: "paragraph",
        text: "Social engineering is the art of manipulating people into divulging confidential information or performing actions that compromise security. Unlike technical attacks, social engineering exploits human psychology rather than software vulnerabilities.",
      },
      {
        type: "heading",
        text: "Common Social Engineering Tactics",
      },
      {
        type: "list",
        text: "• Pretexting: Creating a fabricated scenario to gain trust • Baiting: Offering something enticing to trick victims • Phishing: Fraudulent communications to steal data • Quid pro quo: Promising benefits in exchange for information • Tailgating: Following someone into restricted areas • Impersonation: Posing as authority figures or IT support",
      },
      {
        type: "heading",
        text: "Psychological Triggers Used by Attackers",
      },
      {
        type: "paragraph",
        text: "Social engineers exploit fundamental human emotions and behaviors:",
      },
      {
        type: "list",
        text: "• Urgency and time pressure • Fear of consequences • Authority and intimidation • Trust and helpfulness • Curiosity and greed • Familiarity and liking",
      },
      {
        type: "tip",
        text: "Try this now: Practice saying 'no' to unexpected requests, even from people who seem legitimate. Verify identities through official channels before sharing information.",
      },
      {
        type: "heading",
        text: "Real-World Attack Scenarios",
      },
      {
        type: "paragraph",
        text: "Attackers use various scenarios to trick victims:",
      },
      {
        type: "list",
        text: "• Fake IT support calling about account problems • CEO fraud emails requesting urgent wire transfers • Delivery notifications with malicious links • Job offers requiring personal information upfront • Fake invoices from supposed vendors • Romance scams building long-term relationships",
      },
      {
        type: "heading",
        text: "Defense Strategies",
      },
      {
        type: "list",
        text: "• Verify identities through independent channels • Never share passwords or sensitive data over phone/email • Be skeptical of unsolicited contact • Slow down and think before acting on urgent requests • Implement proper authorization procedures • Train employees on security awareness • Report suspicious interactions immediately",
      },
      {
        type: "tip",
        text: "Try this now: Establish a family code word that can be used to verify identity during phone calls. This prevents impersonation attacks targeting your loved ones.",
      },
      {
        type: "heading",
        text: "Building a Security Mindset",
      },
      {
        type: "paragraph",
        text: "The best defense is awareness. Question unexpected requests, verify before you trust, and remember: legitimate organizations never ask for passwords or pressure you into immediate action.",
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
