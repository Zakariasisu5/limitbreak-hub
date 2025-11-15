import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Mail, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [step, setStep] = useState<"wallet" | "form" | "otp">("wallet");
  const [walletConnected, setWalletConnected] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [attempts, setAttempts] = useState(3);

  const handleWalletConnect = (provider: string) => {
    // Mock wallet connection
    toast.success(`${provider} connected successfully!`);
    setWalletConnected(true);
    setStep("form");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Gmail domain
    if (!formData.email.endsWith("@gmail.com")) {
      toast.error("Please use a Gmail address");
      return;
    }

    if (!formData.username || formData.username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    toast.success("Verification code sent to your email!");
    setStep("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    // Mock verification
    if (otpCode === "123456") {
      toast.success("Verification successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1500);
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) {
        toast.error("Too many failed attempts. Please try again later.");
        setStep("wallet");
        setAttempts(3);
      } else {
        toast.error(`Invalid code. ${attempts - 1} attempts remaining.`);
      }
      setOtp(["", "", "", "", "", ""]);
    }
  };

  const handleResendOtp = () => {
    toast.success("New verification code sent!");
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-4">
            <Shield className="w-8 h-8 text-primary" />
            LimitBreakToken
          </Link>
          <p className="text-muted-foreground">Secure your learning journey</p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
          {step === "wallet" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
                <CardDescription>Choose your preferred wallet provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full h-16 text-lg"
                  onClick={() => handleWalletConnect("MetaMask")}
                >
                  <Wallet className="w-6 h-6 mr-3" />
                  MetaMask
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-16 text-lg"
                  onClick={() => handleWalletConnect("WalletConnect")}
                >
                  <Wallet className="w-6 h-6 mr-3" />
                  WalletConnect
                </Button>
                <div className="text-center text-sm text-muted-foreground pt-4">
                  Don't have a wallet?{" "}
                  <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Get MetaMask
                  </a>
                </div>
              </CardContent>
            </>
          )}

          {step === "form" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
                <CardDescription>We'll send a verification code to your Gmail</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                      minLength={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Gmail Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        required
                        pattern=".+@gmail\.com"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Only Gmail addresses are accepted</p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === "otp" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                <CardDescription>
                  Enter the 6-digit code sent to {formData.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Attempts remaining: <span className="font-bold text-primary">{attempts}</span>
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm text-primary hover:underline"
                  >
                    Resend code
                  </button>
                </div>

                <Button onClick={handleOtpVerify} className="w-full" size="lg">
                  Verify & Continue
                </Button>
              </CardContent>
            </>
          )}
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
