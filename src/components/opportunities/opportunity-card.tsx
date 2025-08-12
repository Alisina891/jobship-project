
import Link from 'next/link';
import { Briefcase, GraduationCap, MapPin, Building, Star, Calendar, Tag } from 'lucide-react';
import type { Opportunity } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const typeIcons: Record<Opportunity['type'], React.ReactNode> = {
  Job: <Briefcase className="h-4 w-4" />,
  Scholarship: <GraduationCap className="h-4 w-4" />,
  Internship: <Star className="h-4 w-4" />,
};

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Link href={`/opportunities/${opportunity.id}`} className="group block">
      <Card className="flex flex-col h-full bg-secondary border-border transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
          <Avatar className="h-14 w-14 rounded-lg border-2 border-border bg-white">
            <AvatarImage src={opportunity.logoUrl} alt={`${opportunity.organization} logo`} className="object-contain p-1" />
            <AvatarFallback className="rounded-lg bg-secondary text-lg font-semibold">{opportunity.organization.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
              <h3 className="text-lg font-semibold font-headline leading-tight text-foreground">
                {opportunity.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Building className="h-4 w-4" />
                {opportunity.organization}
              </p>
          </div>
          {opportunity.featured && (
            <Badge variant="outline" className="border-primary text-primary">
              Featured
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="flex flex-wrap gap-2 text-sm">
            <Badge variant="secondary" className="flex items-center gap-1.5">
              {typeIcons[opportunity.type]}
              {opportunity.type}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {opportunity.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              {opportunity.category}
            </Badge>
          </div>
          {opportunity.closingDate && (
               <div className="flex items-center gap-2 text-sm text-destructive font-medium pt-3 border-t border-dashed border-border">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {new Date(opportunity.closingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
              </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full text-primary text-sm font-semibold flex items-center justify-end">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ms-1 transition-transform group-hover:translate-x-1 group-rtl:-translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
