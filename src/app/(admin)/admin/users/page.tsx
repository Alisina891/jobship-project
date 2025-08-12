
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export const metadata: Metadata = {
  title: 'Manage Users | Bepall Admin',
};

export default function ManageUsersPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Manage Users</h1>
      <Tabs defaultValue="job-seekers">
        <TabsList className="mb-6">
          <TabsTrigger value="job-seekers">Job Seekers</TabsTrigger>
          <TabsTrigger value="employers">Employers</TabsTrigger>
        </TabsList>
        <TabsContent value="job-seekers">
          <Card>
            <CardHeader>
              <CardTitle>Job Seekers</CardTitle>
              <CardDescription>A list of all registered job seekers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-muted-foreground">
                <p>Job seeker management table coming soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="employers">
          <Card>
            <CardHeader>
              <CardTitle>Employers</CardTitle>
              <CardDescription>A list of all registered employers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-muted-foreground">
                <p>Employer management table coming soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
