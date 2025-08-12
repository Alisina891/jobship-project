
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
    return (
        <section className="w-full relative overflow-hidden bg-primary text-primary-foreground">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl opacity-50" />
            
            <div className="container relative py-20 md:py-28 lg:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-block rounded-full bg-primary-foreground/20 px-4 py-1.5 text-sm font-semibold mb-4">
                        <Lightbulb className="inline-block h-4 w-4 mr-2" />
                        AI-Powered Matching
                    </div>
                    <h2 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                        Stop Searching, Start Matching
                    </h2>
                    <p className="mt-6 text-lg text-primary-foreground/80">
                        Our intelligent AI does the hard work for you. Upload your profile and get instantly matched with jobs, scholarships, and internships that align with your unique skills and aspirations.
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 text-base px-8">
                        <Link href="/profile">
                            Discover Your Matches
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
