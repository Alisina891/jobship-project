// OpportunityRecommendation flow definition.
'use server';

/**
 * @fileOverview AI agent that recommends opportunities based on user profiles.
 *
 * - opportunityRecommendation - A function that handles the opportunity recommendation process.
 * - OpportunityRecommendationInput - The input type for the opportunityRecommendation function.
 * - OpportunityRecommendationOutput - The return type for the opportunityRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OpportunityRecommendationInputSchema = z.object({
  userProfile: z.string().describe('A detailed description of the user profile, including skills, experience, education, and interests.'),
  opportunityListings: z.string().describe('A list of available opportunities, including job descriptions, scholarship criteria, and application deadlines.'),
});

export type OpportunityRecommendationInput = z.infer<typeof OpportunityRecommendationInputSchema>;

const OpportunityRecommendationOutputSchema = z.object({
  recommendedOpportunities: z.array(
    z.object({
      id: z.string().describe('The unique identifier of the recommended opportunity.'),
      title: z.string().describe('The title of the recommended opportunity.'),
      description: z.string().describe('A brief description of the opportunity.'),
      relevanceScore: z.number().describe('A numerical score indicating how relevant the opportunity is to the user profile.'),
    })
  ).describe('A list of opportunities recommended for the user, ranked by relevance score.'),
});

export type OpportunityRecommendationOutput = z.infer<typeof OpportunityRecommendationOutputSchema>;

export async function opportunityRecommendation(input: OpportunityRecommendationInput): Promise<OpportunityRecommendationOutput> {
  return opportunityRecommendationFlow(input);
}

const opportunityRecommendationPrompt = ai.definePrompt({
  name: 'opportunityRecommendationPrompt',
  input: {schema: OpportunityRecommendationInputSchema},
  output: {schema: OpportunityRecommendationOutputSchema},
  prompt: `You are an AI assistant designed to recommend relevant opportunities to users based on their profiles.

  Analyze the user profile and the list of available opportunities, and identify the opportunities that best match the user's skills, experience, and interests.
  Provide a relevance score for each recommended opportunity to indicate how well it aligns with the user's profile.

  User Profile:
  {{userProfile}}

  Opportunity Listings:
  {{opportunityListings}}

  Based on the user profile, recommend opportunities from the opportunity listings. Each recommendation should include the id, title, description and relevance score.
  `,
});

const opportunityRecommendationFlow = ai.defineFlow(
  {
    name: 'opportunityRecommendationFlow',
    inputSchema: OpportunityRecommendationInputSchema,
    outputSchema: OpportunityRecommendationOutputSchema,
  },
  async input => {
    const {output} = await opportunityRecommendationPrompt(input);
    return output!;
  }
);
