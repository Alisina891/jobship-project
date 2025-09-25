'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  { id: 1, name: 'Personal Details' },
  { id: 2, name: 'Company Details' },
  { id: 3, name: 'Address Details' },
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  companyName: string;
  companySize: string;
  website?: string;
  industry: string;
  country: string;
  city: string;
  streetAddress: string;
  postalCode?: string;
  role: string;
};

const Stepper = ({ currentStep }: { currentStep: number }) => (
  <nav>
    <ol role="list" className="space-y-8">
      {steps.map((step) => {
        const status =
          step.id < currentStep
            ? 'complete'
            : step.id === currentStep
            ? 'current'
            : 'upcoming';

        return (
          <li key={step.name} className="relative">
            {step.id !== steps.length && (
              <div
                className={cn(
                  'absolute left-5 top-5 -ml-px mt-1 h-full w-0.5',
                  status === 'complete' ? 'bg-primary-foreground' : 'bg-primary-foreground/30'
                )}
              />
            )}
            <div className="relative flex items-center">
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full font-bold z-10',
                  {
                    'bg-primary-foreground text-primary': status === 'complete',
                    'border-2 border-primary-foreground bg-primary-foreground text-primary':
                      status === 'current',
                    'border-2 border-primary-foreground/50 text-primary-foreground/50':
                      status === 'upcoming',
                  }
                )}
              >
                {status === 'complete' ? <Check className="h-6 w-6" /> : <span>{step.id}</span>}
              </span>
              <span className="ml-4 text-lg font-medium text-primary-foreground">{step.name}</span>
            </div>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default function EmployerSignupPage() {
  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
   const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    companyName: '',
    companySize: '',
    website: '',
    industry: '',
    country: '',
    city: '',
    streetAddress: '',
    postalCode: '',
    role: 'Employer',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step < steps.length) {
      setStep((s) => s + 1);
    } else {
      try {
        const res = await fetch('https://jobship-backend-8.onrender.com/api/Auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            formData, 
          ),
        });

        if (res.ok) {
              router.push(`/verify-account?email=${encodeURIComponent(formData.email)}`);
        } else {
          const error = await res.json();
          alert('Error: ' + error.message);
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong!');
      }
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Side */}
      <div className="hidden lg:flex w-full max-w-sm xl:max-w-md flex-col bg-primary p-8 xl:p-12 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <Briefcase className="h-8 w-8" />
          <span className="font-headline">Bepall</span>
        </Link>
        <div className="my-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Have your account now</h1>
            <p className="text-primary-foreground/80">Register as an employer</p>
          </div>
          <Stepper currentStep={step} />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full flex-1 flex-col justify-center items-center p-6 lg:p-12 relative">
        <div className="absolute top-8 right-8 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/signup">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>

          <form onSubmit={handleNextStep} className="space-y-8">
            {/* Step 1 - Personal */}
            {step === 1 && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold font-headline">Personal Details</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name*</Label>
                    <Input
                      id="first-name"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name*</Label>
                    <Input
                      id="last-name"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password*</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={passwordVisible ? 'text' : 'password'}
                      required
                      className="pr-10"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - Company */}
            {step === 2 && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold font-headline">Company Details</h1>
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name*</Label>
                  <Input
                    id="company-name"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size*</Label>
                  <Select
                    onValueChange={(val) => handleChange('companySize', val)}
                    value={formData.companySize}
                  >
                    <SelectTrigger id="company-size">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry*</Label>
                  <Select
                    onValueChange={(val) => handleChange('industry', val)}
                    value={formData.industry}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3 - Address */}
            {step === 3 && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold font-headline">Address Details</h1>
                <div className="space-y-2">
                  <Label htmlFor="country">Country*</Label>
                  <Select
                    onValueChange={(val) => handleChange('country', val)}
                    value={formData.country}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="af">Afghanistan</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="tr">Turkey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City*</Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street-address">Street Address*</Label>
                  <Input
                    id="street-address"
                    required
                    value={formData.streetAddress}
                    onChange={(e) => handleChange('streetAddress', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input
                    id="postal-code"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-end gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="h-12 text-base px-8"
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="h-12 text-base px-8">
                {step === steps.length ? 'Finish' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
