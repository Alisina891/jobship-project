"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ for redirect
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Briefcase } from "lucide-react";

export default function JobSeekerSignupPage() {
    // states for form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasswordHash] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter(); // ✅ for navigation

    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5071/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        role: "User", // fixed role for job seekers
        phoneNumber: phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // بعد از ثبت‌نام موفق، به صفحه verify-account ریدایرکت کن
      router.push(`/verify-account?email=${encodeURIComponent(email)}`);
    } else {
      alert("Error in register: " + JSON.stringify(data));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Cannot connect to server");
  } finally {
    setLoading(false);
  }
};



    return (
        <div className="flex min-h-screen w-full bg-background">
            <div className="hidden lg:flex w-full max-w-sm xl:max-w-md flex-col bg-primary p-8 xl:p-12 text-primary-foreground">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                    <Briefcase className="h-8 w-8" />
                    <span className="font-headline">Bepall</span>
                </Link>
                <div className="my-auto space-y-4 text-center">
                    <img
                        src="https://placehold.co/300x300.png"
                        alt="Illustration of a resume"
                        className="mx-auto"
                    />
                    <h1 className="text-3xl font-semibold">Join the largest job community</h1>
                    <p className="text-primary-foreground/80">
                        Find your dream job and build a successful career.
                    </p>
                </div>
            </div>

            <div className="flex w-full flex-1 flex-col justify-center items-center p-6 lg:p-12 relative">
                <div className="absolute top-8 right-8 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </div>

                <div className="w-full max-w-md space-y-6">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold font-headline tracking-tight">Sign up to Bepall</h1>
                        <p className="text-muted-foreground mt-2">
                            Create your account and apply for your dream job.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name*</Label>
                                <Input
                                    id="first-name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name*</Label>
                                <Input
                                    id="last-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email*</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password*</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={passwordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPasswordHash(e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number*</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                            {loading ? "Loading..." : "Register"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
