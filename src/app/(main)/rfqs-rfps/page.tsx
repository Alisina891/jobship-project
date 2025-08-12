
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RFQs & RFPs | Bepall',
  description: 'Find Requests for Quotations (RFQs) and Requests for Proposals (RFPs) on Bepall.',
};

export default function RfqRfpPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
          RFQs & RFPs
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
          Explore procurement opportunities from various organizations.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
         <Card className="bg-secondary border-0">
          <CardHeader>
            <CardTitle>Procurement Opportunities</CardTitle>
            <CardDescription>
              This section is dedicated to Requests for Quotations (RFQs) and Requests for Proposals (RFPs). Organizations post their procurement needs here, and vendors can find opportunities to provide goods and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
              <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p className="text-lg font-medium">Coming Soon!</p>
                <p className="max-w-md mx-auto">We are working hard to bring you a comprehensive list of RFQs and RFPs. Please check back later.</p>
                 <Button asChild className="mt-6">
                    <Link href="/opportunities">
                        <Search className="ms-2 h-4 w-4" />
                        Explore Other Opportunities
                    </Link>
                </Button>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
