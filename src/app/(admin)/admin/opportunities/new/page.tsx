
import { OpportunityForm } from '@/components/admin/opportunity-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Opportunity | Bepall Admin',
};

export default function NewOpportunityPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Create New Opportunity</h1>
      <OpportunityForm />
    </div>
  );
}
