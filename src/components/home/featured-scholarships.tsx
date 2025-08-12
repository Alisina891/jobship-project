import { opportunities } from '@/lib/data';
import { OpportunityCard } from '@/components/opportunities/opportunity-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturedScholarships() {
  const featuredScholarships = opportunities
    .filter((op) => op.type === 'Scholarship' && op.featured)
    .slice(0, 4);

  if (featuredScholarships.length === 0) {
    return null;
  }
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Featured Scholarships</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find scholarships to fund your education and achieve your goals.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredScholarships.map((op) => (
            <OpportunityCard key={op.id} opportunity={op} />
          ))}
        </div>
        <div className="flex justify-center">
            <Button asChild size="lg">
                <Link href="/opportunities?type=Scholarship">View All Scholarships</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
