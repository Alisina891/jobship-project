import Link from "next/link";
import { Briefcase } from "lucide-react";
import { categories } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Briefcase className="h-7 w-7 text-primary" />
              <span className="font-headline text-foreground">Bepall</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your gateway to career and educational opportunities.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">For Candidates</h4>
            <ul className="space-y-2">
              <li><Link href="/opportunities" className="text-sm text-muted-foreground hover:text-primary">Browse Opportunities</Link></li>
              <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-primary">AI Profile Matching</Link></li>
              <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-primary">My Applications</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Categories</h4>
             <ul className="space-y-2">
              {categories.slice(0, 5).map(cat => (
                <li key={cat.slug}><Link href={`/opportunities?category=${cat.slug}`} className="text-sm text-muted-foreground hover:text-primary">{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/rfqs-rfps" className="text-sm text-muted-foreground hover:text-primary">RFQs & RFPs</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Bepall Opportunities. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
