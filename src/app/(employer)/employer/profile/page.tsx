
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Company Profile | Bepall Employer',
};

export default function CompanyProfilePage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Company Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Company Information</CardTitle>
          <CardDescription>Manage your public company profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 text-muted-foreground">
            <p>Company profile form coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
