
import { Hero } from '@/components/home/hero';
import { LatestOpportunities } from '@/components/home/latest-opportunities';
import { CtaSection } from '@/components/home/cta-section';
import { ResumeBuilderCta } from '@/components/home/resume-builder-cta';
import { TopSponsors } from '@/components/home/top-sponsors';

export default function Home() {
  return (
    <>
      <Hero />
      <LatestOpportunities />
      <CtaSection />
      <ResumeBuilderCta />
      <TopSponsors />
    </>
  );
}
