import { Link } from "react-router-dom";
import { Shield, Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-card/30 backdrop-blur-sm mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">LimitBreakToken</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Master cybersecurity through interactive learning and earn rewards.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/content" className="hover:text-primary transition-colors">
                  All Modules
                </Link>
              </li>
              <li>
                <Link to="/content?category=phishing" className="hover:text-primary transition-colors">
                  Phishing Defense
                </Link>
              </li>
              <li>
                <Link to="/content?category=mfa" className="hover:text-primary transition-colors">
                  MFA Mastery
                </Link>
              </li>
              <li>
                <Link to="/content?category=privacy" className="hover:text-primary transition-colors">
                  Privacy Basics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/token-gate" className="hover:text-primary transition-colors">
                  Get Token
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors">
                  How it Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal & Status</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://status.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Network Status
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 LimitBreakToken. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
