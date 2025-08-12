
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="ms-2 h-4 w-4 animate-spin" />
          Getting Recommendations...
        </>
      ) : (
        <>
          <Lightbulb className="ms-2 h-4 w-4" />
          Find My Matches
        </>
      )}
    </Button>
  );
}

export function AiMatcherClient() {
  const initialState = {};
  const [state, dispatch] = useFormState(getRecommendations, initialState);

  const profileError = typeof state.error === 'object' && state.error?.userProfile?.[0];

  return (
    <div className="space-y-8">
      <Card>
        <form action={dispatch}>
          <CardHeader>
            <CardTitle>AI Opportunity Matching</CardTitle>
            <CardDescription>
              Describe your skills, experience, and interests. Our AI will suggest relevant opportunities for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="userProfile">Your Profile</Label>
              <Textarea
                id="userProfile"
                name="userProfile"
                placeholder="e.g., I am a recent computer science graduate with experience in Python and machine learning, passionate about building sustainable technology..."
                rows={8}
                className={profileError ? 'border-destructive' : ''}
              />
              {profileError && <p className="text-sm text-destructive">{profileError}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs text-muted-foreground">The more detail, the better the match!</p>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {typeof state.error === 'string' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      
      {state.data && (
        <Card>
          <CardHeader>
            <CardTitle>Your Recommended Opportunities</CardTitle>
            <CardDescription>Based on your profile, here are some opportunities you might like.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.data.recommendedOpportunities.length > 0 ? (
              state.data.recommendedOpportunities.map((rec) => (
                <Link key={rec.id} href={`/opportunities/${rec.id}`} className="block group">
                  <div className="flex items-start gap-4 rounded-lg border p-4 group-hover:bg-accent transition-colors">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">{rec.relevanceScore}</div>
                      <div className="flex-1">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{rec.title}</h3>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                  </div>
                </Link>
              ))
            ) : (
                <p className="text-center text-muted-foreground py-8">No specific recommendations found. Try refining your profile description.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
