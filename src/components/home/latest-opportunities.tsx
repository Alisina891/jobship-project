'use client';

import { useState, useEffect } from 'react';
import { fetchOpportunities } from '@/lib/data';
import { OpportunityCard } from '@/components/opportunities/opportunity-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Opportunity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const opportunityTypes: (Opportunity['type'] | 'All')[] = ['All', 'Job', 'Scholarship', 'Internship'];

export function LatestOpportunities() {
  const [activeTab, setActiveTab] = useState<Opportunity['type'] | 'All'>('All');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  // 📌 گرفتن دیتا از بک‌اند
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchOpportunities();
      setOpportunities(data);
    };
    loadData();
  }, []);

  // 📌 فیلتر کردن دیتا
  const getFilteredOpportunities = (type: Opportunity['type'] | 'All') => {
    if (type === 'All') {
      return opportunities.slice(0, 8);
    }
    return opportunities.filter(op => op.type === type).slice(0, 8);
  };

  return (
    <section className="w-full pt-4 pb-12 md:pb-24 lg:pb-32 bg-background">
      <div className="container px-4 md:px-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <div className="flex justify-center">
            <TabsList>
              {opportunityTypes.map(type => (
                <TabsTrigger key={type} value={type}>
                  {type === 'All' ? 'All' : `${type}s`}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {opportunityTypes.map(type => (
            <TabsContent key={type} value={type} className="mt-8">
              <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {getFilteredOpportunities(type).map(op => (
                  <OpportunityCard key={op.id} opportunity={op} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/opportunities">
              Browse All Opportunities <ArrowRight className="ms-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
