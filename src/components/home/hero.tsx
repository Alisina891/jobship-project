
'use client';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set('q', searchTerm.trim());
    }
    router.push(`/opportunities?${params.toString()}`);
  };

  return (
    <section className="w-full pt-20 md:pt-28 lg:pt-40 pb-8 dotted-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-7xl text-foreground">
              Find Your Next <span className="text-primary">Opportunity</span>
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Discover thousands of jobs, scholarships, and internships tailored just for you. Your next big opportunity is just a search away.
            </p>
          </div>
          <div className="w-full">
             <form onSubmit={handleSearch} className="p-2 bg-secondary rounded-full border border-border shadow-lg flex items-center gap-2 max-w-2xl mx-auto">
                <div className="relative flex-grow">
                  <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Job title, keyword, or company"
                    className="ps-12 pe-4 h-14 text-lg w-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                 <Button type="submit" size="lg" className="rounded-full h-12 flex-shrink-0 px-6 text-sm sm:px-8 sm:text-base">
                    Find Opportunity
                 </Button>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
}
