import type { Opportunity, Category, Sponsor } from './types';
import { Briefcase, Cpu, GraduationCap, HeartPulse, Cog, Paintbrush } from 'lucide-react';

// ✅ دسته‌بندی‌ها
export const categories: Category[] = [
  { name: 'Technology', slug: 'technology', icon: Cpu },
  { name: 'Business', slug: 'business', icon: Briefcase },
  { name: 'Healthcare', slug: 'healthcare', icon: HeartPulse },
  { name: 'Engineering', slug: 'engineering', icon: Cog },
  { name: 'Education', slug: 'education', icon: GraduationCap },
  { name: 'Arts & Design', slug: 'arts-design', icon: Paintbrush },
];

// ✅ اسپانسرها
export const sponsors: Sponsor[] = [
  { name: 'Innovatech', logoUrl: 'https://placehold.co/150x50/e0e0e0/000?text=Innovatech' },
  { name: 'Future Leaders Foundation', logoUrl: 'https://placehold.co/150x50/e0e0e0/000?text=Future+Leaders' },
  { name: 'Creative Solutions', logoUrl: 'https://placehold.co/150x50/e0e0e0/000?text=Creative+Solutions' },
  { name: 'DataDriven Inc.', logoUrl: 'https://placehold.co/150x50/e0e0e0/000?text=DataDriven' },
  { name: 'Growth Gurus', logoUrl: 'https://placehold.co/150x50/e0e0e0/000?text=Growth+Gurus' },
  { name: 'ServerSide Co.', logoUrl: 'https://placehold.co/150x50/e0e0e0/000?text=ServerSide' },
];

// ✅ گرفتن فرصت‌ها از بک‌اند
export async function fetchOpportunities(): Promise<Opportunity[]> {
  try {
    const res = await fetch("http://localhost:5071/api/post/posts", {
      cache: "no-store", // همیشه تازه بیاره
    });

    if (!res.ok) throw new Error("Failed to fetch opportunities");

    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching opportunities:", error);
    return [];
  }
}
