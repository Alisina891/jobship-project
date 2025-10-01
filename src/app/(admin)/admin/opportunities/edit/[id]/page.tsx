// مثال استفاده در صفحه Edit
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { EditOpportunityForm } from '@/components/admin/editOpportunity-form';
import { Opportunity } from '@/lib/types';

export default function EditOpportunityPage() {
  const params = useParams();
  const id = params.id as string;
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jobship-backend-8.onrender.com/api/Post/post/${id}`);
        if (response.ok) {
          const data = await response.json();
          setOpportunity(data);
        }
      } catch (error) {
        console.error('Error fetching opportunity:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Opportunity</h1>
      <EditOpportunityForm opportunity={opportunity} />
    </div>
  );
}
