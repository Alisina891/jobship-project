
import { OpportunityForm } from '@/components/admin/opportunity-form';
import { opportunities } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Opportunity | Bepall Admin',
};

export default function EditOpportunityPage({ params }: { params: { id: string } }) {
    const opportunity = opportunities.find((op) => op.id === params.id);

    if (!opportunity) {
        notFound();
    }

    return (
        <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Edit Opportunity</h1>
            <OpportunityForm opportunity={opportunity} />
        </div>
    );
}
