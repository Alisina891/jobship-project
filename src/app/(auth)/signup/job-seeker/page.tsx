
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, Eye, EyeOff } from 'lucide-react';

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.152 6.896c-.922 0-1.855.487-2.556 1.344-.76.921-1.33 2.01-.98 3.23.333 1.155.943 2.247 1.95 2.247.942 0 1.854-.51 2.555-1.368.72-.897 1.255-1.996.942-3.155-.332-1.132-1.028-2.298-2.01-2.298zm4.444-2.846c-.522-.64-1.222-1.043-2.01-1.127-.247-.027-.51-.04-.796-.04-.988 0-1.933.32-2.733.933-.76.573-1.42 1.48-1.786 2.513-.387 1.096-.187 2.373.546 3.447.796 1.168 1.91 1.886 3.106 1.886.226 0 .453-.027.68-.08.922-.213 1.742-.773 2.36-1.573.04-.053.08-.106.12-.16.026-.04.04-.066.04-.066s-.066.027-.146-.013c-.093-.053-.186-.106-.28-.173l-.026-.013c-.68-.48-1.206-1.24-1.39-2.08-.174-.867.2-1.734.92-2.307.72-.573 1.666-.813 2.573-.546.12.04.24.067.36.107.026.013.053.027.08.027.026 0 .04-.013.04-.027-.013-.253-.12-.506-.293-.733zm-3.32 10.947c1.332.133 2.516-.867 3.29-.867.796 0 1.972.96 3.226.84.133-.013.253-.013.373-.013-1.465 1.04-2.65 2.8-3.41 4.52-1.012 2.32-1.89 4.8-3.425 4.786-1.492-.013-2.265-1.013-3.73-1.013s-2.158 1.013-3.666 1.026c-1.545.013-2.944-2.84-4.22-5.5-.942-1.894-1.638-3.927-1.332-5.934 1.345.093 2.81.933 3.89 2.053.987 1.013 1.918 2.386 3.316 2.386.173 0 .346-.013.52-.04z"/>
    </svg>
)

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.85l3.25-3.138C18.189 1.186 15.479 0 12.24 0 5.49 0 0 5.49 0 12s5.49 12 12.24 12c6.806 0 11.91-4.218 11.91-11.756 0-.78-.072-1.54-.2-2.258H12.24z"/>
    </svg>
)

export default function JobSeekerSignupPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    return (
        <div className="flex min-h-screen w-full bg-background">
            <div className="hidden lg:flex w-full max-w-sm xl:max-w-md flex-col bg-primary p-8 xl:p-12 text-primary-foreground">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                    <Briefcase className="h-8 w-8" />
                    <span className="font-headline">Bepall</span>
                </Link>
                <div className="my-auto space-y-4 text-center">
                    <img src="https://placehold.co/300x300.png" alt="Illustration of a resume" className="mx-auto" data-ai-hint="resume document" />
                     <h1 className="text-3xl font-semibold">Join the largest job community</h1>
                     <p className="text-primary-foreground/80">Find your dream job and build a successful career.</p>
                </div>
            </div>

            <div className="flex w-full flex-1 flex-col justify-center items-center p-6 lg:p-12 relative">
                <div className="absolute top-8 right-8 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </div>

                <div className="w-full max-w-md space-y-6">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold font-headline tracking-tight">
                            Sign up to Bepall
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Create your account and apply for your dream job.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full h-12 text-base">
                            <AppleIcon className="h-6 w-6 fill-current" />
                            With Apple
                        </Button>
                        <Button variant="outline" className="w-full h-12 text-base">
                            <GoogleIcon className="h-6 w-6 fill-current" />
                            With Google
                        </Button>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
                        <div className="flex-grow border-t border-border"></div>
                    </div>
                    
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name*</Label>
                                <Input id="first-name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name*</Label>
                                <Input id="last-name" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email*</Label>
                            <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password*</Label>
                            <div className="relative">
                                <Input id="password" type={passwordVisible ? "text" : "password"} required className="pr-10" />
                                <Button type="button" variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number*</Label>
                            <Input id="phone" type="tel" required />
                        </div>
                        <Button type="submit" className="w-full h-12 text-base">
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
