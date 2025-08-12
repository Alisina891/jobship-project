
import { sponsors } from "@/lib/data";
import Image from "next/image";

export function TopSponsors() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container">
        <h3 className="text-center text-lg font-semibold text-muted-foreground tracking-wider mb-8">
          TRUSTED BY TOP COMPANIES AND UNIVERSITIES
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 opacity-75">
          {sponsors.map((sponsor) => (
            <Image
              key={sponsor.name}
              src={sponsor.logoUrl}
              alt={`${sponsor.name} logo`}
              width={140}
              height={40}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              data-ai-hint="company logo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
