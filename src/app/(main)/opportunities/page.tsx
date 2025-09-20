// app/opportunities/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { OpportunitiesClient } from '@/components/opportunities/opportunities-client';
import { Skeleton } from '@/components/ui/skeleton';
import type { Opportunity } from '@/lib/types';
import { fetchOpportunities } from '@/lib/data';



// Skeleton loader
function LoadingState() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <Skeleton className="h-10 w-3/4 max-w-lg" />
        <Skeleton className="h-6 w-1/2 max-w-md" />
      </div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-full sm:w-[180px]" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-[280px] rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// صفحه Opportunities
export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOpportunities(); // فراخوانی API
        setOpportunities(data);
      } catch (error) {
        console.error('Failed to fetch opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return <OpportunitiesClient opportunities={opportunities} />;
}
