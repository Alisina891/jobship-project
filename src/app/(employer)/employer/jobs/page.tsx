'use client';

import { useEffect, useState } from 'react';
import { OpportunitiesTable } from '@/components/employer/opportunities-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import type { Opportunity } from '@/lib/types';

// ✅ گرفتن دیتا مستقیم در همین صفحه
async function fetchOpportunities(): Promise<Opportunity[]> {
  try {
    const token = localStorage.getItem("token"); // توکن ذخیره‌شده
    const res = await fetch("https://jobship-backend-8.onrender.com/api/post/my-posts", {
      cache: "no-store",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch opportunities: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching opportunities:", error);
    return [];
  }
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      const data = await fetchOpportunities();
      setJobs(data);
      setLoading(false);
    }
    loadJobs();
  }, []);

  return (
    <div className="p-6 pb-0 md:p-8">
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
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">
              Loading jobs...
            </div>
          ) : (
            <OpportunitiesTable initialData={jobs} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
