import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OpportunityForm } from '@/components/admin/opportunity-form';

export const metadata: Metadata = {
  title: 'Post a Job | Bepall Employer',
};


export default function PostJobPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Post a New <span className='text-green-500'>Job</span></h1>
      <OpportunityForm />
     
    </div>
  );
}





