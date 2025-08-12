
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ResumeBuilderCta() {
    return (
        <section className="w-full py-20 md:py-28 lg:py-32 bg-secondary">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
                            Free Resume Builder
                        </div>
                        <h2 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl text-foreground">
                            Craft a Resume That Opens Doors
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Create a professional, polished resume in minutes with our intuitive builder. Choose from modern templates, get expert tips, and download a PDF that's guaranteed to impress employers.
                        </p>
                        <Button asChild size="lg" className="h-12 text-base px-8">
                            <Link href="/profile">
                                Create My Resume
                                <ArrowRight className="ms-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="https://placehold.co/600x400.png"
                            width={600}
                            height={400}
                            alt="Illustration of a resume"
                            className="rounded-xl shadow-2xl"
                            data-ai-hint="resume document"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
