'use server';

import { opportunityRecommendation, OpportunityRecommendationOutput } from '@/ai/flows/opportunity-recommendation';
import { opportunities } from '@/lib/data';
import { z } from 'zod';

const recommendationSchema = z.object({
  userProfile: z.string().min(50, 'Please provide a more detailed profile for better recommendations.'),
});

type RecommendationState = {
  data?: OpportunityRecommendationOutput;
  error?: string | Record<string, string[] | undefined>;
};

export async function getRecommendations(
  prevState: RecommendationState,
  formData: FormData
): Promise<RecommendationState> {
  const validatedFields = recommendationSchema.safeParse({
    userProfile: formData.get('userProfile'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const opportunityListings = JSON.stringify(
      opportunities.map(o => ({
        id: o.id,
        title: o.title,
        description: o.description,
      }))
    );

    const result = await opportunityRecommendation({
      userProfile: validatedFields.data.userProfile,
      opportunityListings: opportunityListings,
    });

    if (!result || !result.recommendedOpportunities) {
        return { error: 'The AI could not generate recommendations. Please try again.' };
    }

    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while getting recommendations. Please try again later.' };
  }
}
