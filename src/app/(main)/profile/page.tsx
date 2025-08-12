import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AiMatcherClient } from '@/components/profile/ai-matcher-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'My Profile | Bepall',
};

export default function ProfilePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Your Profile</h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
          Manage your applications and find AI-powered recommendations.
        </p>
      </div>

      <Tabs defaultValue="ai-matcher" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-matcher">AI Opportunity Matching</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="ai-matcher" className="mt-6">
          <AiMatcherClient />
        </TabsContent>
        <TabsContent value="applications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium">Coming Soon!</p>
                <p>This section will help you track your saved opportunities and applications.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
