
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Manage Jobs | Bepall Employer',
};

export default function ManageJobsPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Manage Jobs</h1>
        <Button asChild>
          <Link href="/employer/post-job">
            <PlusCircle className="mr-2 h-4 w-4" /> Post a Job
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Job Listings</CardTitle>
          <CardDescription>A list of all jobs you have posted.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 text-muted-foreground">
            <p>Job management table coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
