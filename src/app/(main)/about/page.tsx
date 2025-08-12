import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Bepall',
  description: 'Learn more about Bepall and our mission to connect talent with opportunity.',
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
            About Bepall
          </h1>
          <p className="text-lg text-muted-foreground">
            Our mission is to bridge the gap between talented individuals and life-changing opportunities in Afghanistan and beyond.
          </p>
        </div>

        <Card className="bg-secondary border-0">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Bepall was founded on a simple yet powerful idea: that everyone deserves access to opportunities that can help them grow, learn, and succeed. In a region rich with talent but often lacking a centralized platform for discovery, we saw a need to create a space where jobs, scholarships, and internships are easily accessible to all.
            </p>
            <p>
              We are a team of passionate developers, designers, and community builders dedicated to creating a transparent and efficient ecosystem for both opportunity seekers and providers. We leverage technology, including cutting-edge AI, to create personalized and relevant matches, making the search process smarter, not harder.
            </p>
            <p>
              Our platform is more than just a listing service. It's a community hub designed to empower individuals by providing them with the tools and resources they need to advance their careers and educational journeys. Whether you're a recent graduate looking for your first job, a professional seeking a new challenge, or a student in search of financial aid, Bepall is here to support you every step of the way.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
