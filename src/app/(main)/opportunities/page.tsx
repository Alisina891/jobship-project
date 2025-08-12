import { opportunities } from '@/lib/data';
import { OpportunitiesClient } from '@/components/opportunities/opportunities-client';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'All Opportunities | Bepall',
};

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
              {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-[280px] rounded-lg" />)}
          </div>
      </div>
  )
}

export default function OpportunitiesPage() {
  // In a real app, this would be an API call
  const allOpportunities = opportunities;

  return (
    <Suspense fallback={<LoadingState />}>
      <OpportunitiesClient opportunities={allOpportunities} />
    </Suspense>
  );
}
