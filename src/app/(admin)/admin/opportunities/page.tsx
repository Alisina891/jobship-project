
import type { Metadata } from 'next';
import { opportunities } from '@/lib/data';
import { OpportunitiesTable } from '@/components/admin/opportunities-table';

export const metadata: Metadata = {
  title: 'Manage Opportunities | Bepall Admin',
};

export default function ManageOpportunitiesPage() {
  // In a real app, you would fetch this from an API
  const initialData = opportunities;
  
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Manage Opportunities</h1>
      <OpportunitiesTable initialData={initialData} />
    </div>
  );
}
