// app/(auth)/verify-account/VerifyOtpContent.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message1, setMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const router = useRouter();

  // اگر ایمیل خالی بود → ری‌دایرکت کن به signup
  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  // تایید OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5071/api/Auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("✅ Verification successful!");
        router.push("/profile");
      } else {
        setMessage("❌ The code is invalid or incorrect.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ارسال مجدد OTP با تایمر
  const handleResend = async () => {
    setResendDisabled(true);
    setResendTimer(60);

    try {
      await fetch("http://localhost:5071/api/Auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setMessage("📩 A new code has been sent.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Cannot resend code.");
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-full max-w-sm xl:max-w-md flex-col bg-primary p-8 xl:p-12 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span className="font-headline">Bepall</span>
        </Link>
        <div className="my-auto space-y-4 text-center">
          <img
            src="https://placehold.co/300x300.png"
            alt="Illustration"
            className="mx-auto"
          />
          <h1 className="text-3xl font-semibold">Join the largest job community</h1>
          <p className="text-primary-foreground/80">
            Find your dream job and build a successful career.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - OTP VERIFICATION */}
      <div className="flex w-full flex-1 flex-col justify-center items-center p-6 lg:p-12 relative">
        <div className="absolute top-8 right-8 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
              Verify Your Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter the 6-digit code we sent to
            </p>
            <p className="text-muted-foreground font-semibold">{email}</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="otp">Verification code</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendDisabled}
                className={`text-blue-500 hover:underline ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {resendDisabled
                  ? `Resend code in ${resendTimer}s`
                  : "Resend code"}
              </button>
              <p
                className={`ml-2 ${
                  message1.startsWith("✅") || message1.startsWith("📩")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message1}
              </p>
            </div>

            <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}