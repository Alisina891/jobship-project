import { fetchOpportunities } from '@/lib/data';
import { OpportunitiesTable } from '@/components/admin/opportunities-table';

export const dynamic = 'force-dynamic'; // اجبارا SSR

export default async function ManageOpportunitiesPage() {
  const initialData = await fetchOpportunities();

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Manage Opportunities</h1>
      <OpportunitiesTable initialData={initialData} />
    </div>
  );
}
