
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Briefcase, CheckCircle, UserRound, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export default function SignupPage() {
  const [role, setRole] = useState('job-seeker');
  const router = useRouter();

  const benefits = {
    'job-seeker': [
      'Create your free resume',
      '100k+ job vacancies',
      'Professional networking',
      'Email and SMS job alerts',
    ],
    employer: [
      'Post job vacancies to a large audience',
      'Access a diverse and talented pool of candidates',
      'Utilize advanced filtering to find the right fit',
      'Build and promote your company brand',
    ],
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (role === 'job-seeker') {
      router.push('/signup/job-seeker');
    } else {
      router.push('/signup/employer');
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="hidden lg:flex w-full max-w-sm xl:max-w-md flex-col bg-primary p-8 xl:p-12 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <Briefcase className="h-8 w-8" />
          <span className="font-headline">Bepall</span>
        </Link>
        <div className="my-auto">
          <h1 className="text-3xl font-semibold mb-6">
            As a {role === 'job-seeker' ? 'jobseeker' : 'employer'} you'll get
            access to:
          </h1>
          <ul className="space-y-4">
            {benefits[role as keyof typeof benefits].map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-lg">
                <CheckCircle className="h-6 w-6 mt-1 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col justify-center items-center p-6 lg:p-12 relative">
        <div className="absolute top-8 right-8 text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
              Create an account
            </h1>
            <p className="text-muted-foreground mt-2">
              Select the option that best describes you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <RadioGroup
              value={role}
              onValueChange={setRole}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <label
                htmlFor="job-seeker"
                className={cn(
                  'border-2 rounded-lg p-6 text-center cursor-pointer transition-all relative group',
                  role === 'job-seeker'
                    ? 'border-primary shadow-lg'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <RadioGroupItem
                  value="job-seeker"
                  id="job-seeker"
                  className="sr-only"
                />
                <div
                  className={cn(
                    'absolute top-3 right-3 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
                    role === 'job-seeker'
                      ? 'bg-primary border-primary'
                      : 'bg-transparent border-muted-foreground/50 group-hover:border-primary'
                  )}
                >
                  {role === 'job-seeker' && (
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  )}
                </div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <UserRound className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-lg font-semibold">Job Seeker</h2>
                <p className="text-sm text-muted-foreground">
                  looking for a job?
                </p>
              </label>

              <label
                htmlFor="employer"
                className={cn(
                  'border-2 rounded-lg p-6 text-center cursor-pointer transition-all relative group',
                  role === 'employer'
                    ? 'border-primary shadow-lg'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <RadioGroupItem
                  value="employer"
                  id="employer"
                  className="sr-only"
                />
                <div
                  className={cn(
                    'absolute top-3 right-3 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
                    role === 'employer'
                      ? 'bg-primary border-primary'
                      : 'bg-transparent border-muted-foreground/50 group-hover:border-primary'
                  )}
                >
                  {role === 'employer' && (
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  )}
                </div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-lg font-semibold">Employer</h2>
                <p className="text-sm text-muted-foreground">
                  Hiring a new employee?
                </p>
              </label>
            </RadioGroup>

            <Button type="submit" className="w-full h-12 text-base">
              Next
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
