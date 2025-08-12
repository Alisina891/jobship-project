
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Employer Settings | Bepall',
};

export default function EmployerSettingsPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account and notification settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 text-muted-foreground">
            <p>Settings form coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
