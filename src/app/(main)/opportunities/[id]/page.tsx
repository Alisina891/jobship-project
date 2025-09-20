import { fetchOpportunities } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Briefcase, GraduationCap, Star, MapPin, Building, Tag, ExternalLink, DollarSign, 
  CheckCircle, CalendarPlus, CalendarX, FileKey2, Users, Wallet, Award, Clock, 
  FileText, CalendarClock, RefreshCw, Layers, Globe, Mail, Users2 
} from 'lucide-react';
import type { Opportunity } from '@/lib/types';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type React from 'react';

const typeIcons: Record<Opportunity['type'], React.ReactNode> = {
  Job: <Briefcase className="h-4 w-4" />,
  Scholarship: <GraduationCap className="h-4 w-4" />,
  Internship: <Star className="h-4 w-4" />,
};

function DetailItem({ icon: Icon, label, value, variant = 'default' }: { 
  icon: React.ElementType; 
  label: string; 
  value?: React.ReactNode; 
  variant?: 'default' | 'destructive' 
}) {
  if (value === null || value === undefined || value === '') return null;

  return (
    <div className="flex items-start gap-3">
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0", 
        variant === 'default' && 'bg-primary/10 text-primary',
        variant === 'destructive' && 'bg-destructive/10 text-destructive'
      )}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-muted-foreground">{label}</p>
        <p className={cn(
          "font-medium",
          variant === 'default' && 'text-foreground',
          variant === 'destructive' && 'text-destructive'
        )}>
          {value}
        </p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const opportunities = await fetchOpportunities(); // ✅ گرفتن دیتا
  const opportunity = opportunities.find((op) => String(op.id) === params.id);

  if (!opportunity) {
    return {
      title: 'Opportunity Not Found | Bepall',
    }
  }

  return {
    title: `${opportunity.title} | Bepall`,
    description: opportunity.description.substring(0, 160),
  }
}

export default async function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const opportunities = await fetchOpportunities(); // ✅ گرفتن دیتا
  const opportunity = opportunities.find((op) => String(op.id) === params.id);

  if (!opportunity) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* left side */}
          <div className="md:col-span-2 space-y-8">
            <Card className="bg-secondary border-0">
              <CardHeader className="flex flex-col items-start gap-4 md:flex-row">
                <Image 
                  src={opportunity.logoUrl} 
                  alt={`${opportunity.organization} logo`} 
                  width={100} 
                  height={100} 
                  className="rounded-xl border-2 border-border bg-white aspect-square object-contain p-2"
                  data-ai-hint="company logo"
                />
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary border-primary/20">
                    {opportunity.type}
                  </Badge>
                  <h1 className="text-3xl font-bold font-headline">{opportunity.title}</h1>
                  <p className="text-lg text-muted-foreground flex items-center gap-2 mt-1">
                    <Building className="h-5 w-5" />
                    {opportunity.organization}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground leading-relaxed mt-4">{opportunity.description}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {(opportunity.type === 'Job' || opportunity.type === 'Internship') && opportunity.responsibilities && (
              <Card className="bg-secondary border-0">
                <CardHeader>
                  <CardTitle>Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {opportunity.responsibilities.map((item, index) => 
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Qualifications */}
            {(opportunity.type === 'Job' || opportunity.type === 'Internship') && opportunity.qualifications && (
              <Card className="bg-secondary border-0">
                <CardHeader>
                  <CardTitle>Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {opportunity.qualifications.map((item, index) => 
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Eligibility */}
            {opportunity.type === 'Scholarship' && Array.isArray(opportunity.eligibility) && opportunity.eligibility.length > 0 && (
              <Card className="bg-secondary border-0">
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {opportunity.eligibility.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

          </div>

          {/* right side */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="bg-secondary border-0">
                <CardHeader>
                    <CardTitle>Opportunity Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <DetailItem icon={Tag} label="Category" value={opportunity.category} />
                    <DetailItem icon={MapPin} label="Location" value={opportunity.location} />
                    <DetailItem 
  icon={Globe} 
  label="Country" 
  value={Array.isArray(opportunity.countries) ? opportunity.countries.join(', ') : opportunity.countries} 
/>

                    <DetailItem icon={Users} label="Number of Vacancies" value={opportunity.numberOfVacancies} />
                    <DetailItem icon={Layers} label="Functional Area" value={opportunity.functionalArea} />
                    <DetailItem icon={Users2} label="Gender" value={opportunity.gender} />
                    <DetailItem icon={GraduationCap} label="Minimum Education" value={opportunity.minimumEducation} />
                    <DetailItem icon={Award} label="Years of Experience" value={opportunity.yearsOfExperience} />
                    <DetailItem icon={FileText} label="Contract Type" value={opportunity.contractType} />
                    <DetailItem icon={CalendarClock} label="Contract Duration" value={opportunity.contractDuration} />
                    <DetailItem icon={Clock} label="Probation Period" value={opportunity.probationPeriod} />
                    <DetailItem icon={RefreshCw} label="Contract Extensible" value={opportunity.contractExtensible === undefined ? undefined : (opportunity.contractExtensible ? 'Yes' : 'No')} />
                    <DetailItem icon={Wallet} label="Salary Range" value={opportunity.salaryRange} />
                    <DetailItem icon={FileKey2} label="Reference" value={opportunity.reference} />
                    <DetailItem icon={Mail} label="Submission Email" value={opportunity.submissionEmail} />
                    {opportunity.awardAmount && <DetailItem icon={DollarSign} label="Award" value={opportunity.awardAmount} />}
                    <DetailItem 
                      icon={CalendarPlus} 
                      label="Post Date" 
                      value={opportunity.postDate ? new Date(opportunity.postDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : undefined} 
                    />
                    <DetailItem 
                      icon={CalendarX} 
                      label="Closing Date" 
                      variant="destructive" 
                      value={opportunity.closingDate ? new Date(opportunity.closingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : undefined} 
                    />
                </CardContent>
              </Card>

              <div>
                <Button asChild size="lg" className="w-full text-lg py-6">
                    <Link href={opportunity.submissionEmail ? `mailto:${opportunity.submissionEmail}` : opportunity.url} target="_blank" rel="noopener noreferrer">
                        Apply Now <ExternalLink className="ms-2 h-5 w-5" />
                    </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                    {opportunity.submissionEmail ? "You will be redirected to your email client." : "You will be redirected to an external site."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
