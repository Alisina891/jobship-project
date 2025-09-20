'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OpportunityCard } from './opportunity-card';
import type { Opportunity } from '@/lib/types';
import { Search, MapPin, List } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { categories } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '../ui/button';

export function OpportunitiesClient({ opportunities }: { opportunities: Opportunity[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm.trim()) params.set('q', searchTerm.trim()); else params.delete('q');
    if (typeFilter !== 'All') params.set('type', typeFilter); else params.delete('type');
    if (categoryFilter !== 'all') params.set('category', categoryFilter); else params.delete('category');
    if (locationFilter.trim()) params.set('location', locationFilter.trim()); else params.delete('location');

    const handler = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, typeFilter, categoryFilter, locationFilter, pathname, router, searchParams]);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((op) => {
      const title = op.title || '';
      const organization = op.organization || '';
      const description = op.description || '';
      const location = op.location || '';
      const category = op.category || '';
      const type = op.type || '';

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'All' || type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || categories.find(c => c.slug === categoryFilter)?.name === category;
      const matchesLocation = location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesType && matchesCategory && matchesLocation;
    });
  }, [opportunities, searchTerm, typeFilter, categoryFilter, locationFilter]);

  const resetFilters = () => {
      setSearchTerm('');
      setTypeFilter('All');
      setCategoryFilter('all');
      setLocationFilter('');
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Find Your Opportunity</h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
          Browse, filter, and find the perfect opportunity for you.
        </p>
      </div>
      
      <Tabs value={typeFilter} onValueChange={setTypeFilter} className="mb-8 flex justify-center">
        <TabsList>
          <TabsTrigger value="All">All Types</TabsTrigger>
          <TabsTrigger value="Job">Jobs</TabsTrigger>
          <TabsTrigger value="Scholarship">Scholarships</TabsTrigger>
          <TabsTrigger value="Internship">Internships</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by title, organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <div className="relative">
            <List className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full h-12 pl-10">
                    <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                placeholder="Location (e.g. Kabul)"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 h-12"
            />
        </div>
      </div>
      
      <div className="mb-8 flex justify-end">
        <Button variant="ghost" onClick={resetFilters}>Reset Filters</Button>
      </div>

      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredOpportunities.map((op) => (
            <OpportunityCard key={op.id} opportunity={op} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">No opportunities found.</p>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
