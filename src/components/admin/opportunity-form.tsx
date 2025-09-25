
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Opportunity } from '@/lib/types';
import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const opportunitySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  organization: z.string().min(1, 'Organization is required'),
  type: z.enum(['Job', 'Scholarship', 'Internship']),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  url: z.string().url('Must be a valid URL'),
  featured: z.boolean().default(false),
  logoUrl: z.string().url('Must be a valid URL'),
  category: z.string().min(1, 'Category is required'),
  closingDate: z.date().optional(),
  postDate: z.date().optional(),
  reference: z.string().optional(),
  numberOfVacancies: z.coerce.number().optional(),
  salaryRange: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  probationPeriod: z.string().optional(),
  contractType: z.string().optional(),
  contractDuration: z.string().optional(),
  contractExtensible: z.boolean().default(false),
  minimumEducation: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Any']).optional(),
  functionalArea: z.string().optional(),
  submissionEmail: z.string().email('Must be a valid email').optional(),
  responsibilities: z.string().optional(),
  qualifications: z.string().optional(),
  eligibility: z.string().optional(),
  awardAmount: z.string().optional(),
  countries: z.string().optional(),
});

type OpportunityFormValues = z.infer<typeof opportunitySchema>;

interface OpportunityFormProps {
  opportunity?: Opportunity | null;
}

const arrayToString = (arr?: string[]) => arr?.join('\n') || '';
const stringToArray = (str?: string) => str ? str.split('\n').filter(s => s.trim() !== '') : [];

export function OpportunityForm({ opportunity }: OpportunityFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<OpportunityFormValues>({
  resolver: zodResolver(opportunitySchema),
  defaultValues: {
    id: undefined,
    title: "",
    organization: "",
    type: "Job",
    location: "",
    description: "",
    url: "",
    featured: false,
    logoUrl: "",
    category: "",
    closingDate: undefined,
    postDate: undefined,
    reference: "",
    numberOfVacancies: 1,
    salaryRange: "",
    yearsOfExperience: "",
    probationPeriod: "",
    contractType: "",
    contractDuration: "",
    contractExtensible: false,
    minimumEducation: "",
    gender: "Any",
    functionalArea: "",
    submissionEmail: "",
    responsibilities: "",
    qualifications: "",
    eligibility: "",
    awardAmount: "",
    countries: "",
  },
});


  const opportunityType = form.watch('type');

  useEffect(() => {
    if (opportunity) {
      form.reset({
        ...opportunity,
        closingDate: opportunity.closingDate ? new Date(opportunity.closingDate) : undefined,
        postDate: opportunity.postDate ? new Date(opportunity.postDate) : undefined,
        responsibilities: arrayToString(opportunity.responsibilities),
        qualifications: arrayToString(opportunity.qualifications),
        eligibility: arrayToString(opportunity.eligibility),
        countries: arrayToString(opportunity.countries),
      });
    } else {
      form.reset({
        id: undefined,
        title: '',
        organization: '',
        type: 'Job',
        location: '',
        description: '',
        url: '',
        featured: false,
        logoUrl: '',
        category: '',
        closingDate: undefined,
        postDate: undefined,
        reference: '',
        numberOfVacancies: 1,
        salaryRange: '',
        yearsOfExperience: '',
        probationPeriod: '',
        contractType: '',
        contractDuration: '',
        contractExtensible: false,
        minimumEducation: '',
        gender: 'Any',
        functionalArea: '',
        submissionEmail: '',
        responsibilities: '',
        qualifications: '',
        eligibility: '',
        awardAmount: '',
        countries: '',
      });
    }
  }, [opportunity, form]);
  

  const onSubmit = async (data: OpportunityFormValues) => {
  try {
    const token = localStorage.getItem('token'); // یا هر جایی که توکن رو ذخیره می‌کنی
    const response = await fetch("https://jobship-backend-8.onrender.com/api/Post/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      credentials: "include", // اگه JWT یا کوکی داری برای auth
      body: JSON.stringify({
        ...data,
        closingDate: data.closingDate?.toISOString(),
        postDate: data.postDate?.toISOString(),
        responsibilities: stringToArray(data.responsibilities).join('\n'),
        qualifications: stringToArray(data.qualifications).join('\n'),
        eligibility: stringToArray(data.eligibility).join('\n'),
        countries: stringToArray(data.countries).join('\n'),
        // userId removed
      }),

    });

    if (!response.ok) {
      throw new Error("Failed to save opportunity");
    }

    const result = await response.json();

    toast({
      title: "Success",
      description: `Opportunity ${opportunity ? "updated" : "created"} successfully.`,
    });

    // Redirect after success
    router.push("/admin/opportunities");
    router.refresh();
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Something went wrong while saving the opportunity.",
      variant: "destructive",
    });
  }
};


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {/* General Fields */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="organization" render={({ field }) => ( <FormItem><FormLabel>Organization</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="type" render={({ field }) => ( <FormItem><FormLabel>Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Job">Job</SelectItem><SelectItem value="Scholarship">Scholarship</SelectItem><SelectItem value="Internship">Internship</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="category" render={({ field }) => ( <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent>{categories.map(cat => <SelectItem key={cat.slug} value={cat.name}>{cat.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="location" render={({ field }) => ( <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="url" render={({ field }) => ( <FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="logoUrl" render={({ field }) => ( <FormItem><FormLabel>Logo URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="submissionEmail" render={({ field }) => ( <FormItem><FormLabel>Submission Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem> )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="postDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Post Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="closingDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Closing Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem> )} />
                </div>
                <FormField control={form.control} name="featured" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Featured</FormLabel><FormDescription>Feature this opportunity on the homepage.</FormDescription></div></FormItem> )} />
              </div>

              {/* Job/Internship Fields */}
              {(opportunityType === 'Job' || opportunityType === 'Internship') && (
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">{opportunityType} Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="salaryRange" render={({ field }) => ( <FormItem><FormLabel>Salary Range</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="yearsOfExperience" render={({ field }) => ( <FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="numberOfVacancies" render={({ field }) => ( <FormItem><FormLabel>Number of Vacancies</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="probationPeriod" render={({ field }) => ( <FormItem><FormLabel>Probation Period</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="contractType" render={({ field }) => ( <FormItem><FormLabel>Contract Type</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="contractDuration" render={({ field }) => ( <FormItem><FormLabel>Contract Duration</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="minimumEducation" render={({ field }) => ( <FormItem><FormLabel>Minimum Education</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="gender" render={({ field }) => ( <FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Any">Any</SelectItem><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent></Select></FormItem> )} />
                      <FormField control={form.control} name="functionalArea" render={({ field }) => ( <FormItem><FormLabel>Functional Area</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="reference" render={({ field }) => ( <FormItem><FormLabel>Reference</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                    </div>
                    <FormField control={form.control} name="countries" render={({ field }) => ( <FormItem><FormLabel>Countries</FormLabel><FormControl><Textarea placeholder="One country per line" {...field} /></FormControl></FormItem> )} />
                    <FormField control={form.control} name="responsibilities" render={({ field }) => ( <FormItem><FormLabel>Responsibilities</FormLabel><FormControl><Textarea placeholder="One item per line" {...field} rows={5} /></FormControl></FormItem> )} />
                    <FormField control={form.control} name="qualifications" render={({ field }) => ( <FormItem><FormLabel>Qualifications</FormLabel><FormControl><Textarea placeholder="One item per line" {...field} rows={5} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name="contractExtensible" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Contract Extensible</FormLabel></div></FormItem> )} />
                </div>
              )}
              
              {/* Scholarship Fields */}
              {opportunityType === 'Scholarship' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Scholarship Details</h3>
                  <FormField control={form.control} name="awardAmount" render={({ field }) => ( <FormItem><FormLabel>Award Amount</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                  <FormField control={form.control} name="eligibility" render={({ field }) => ( <FormItem><FormLabel>Eligibility</FormLabel><FormControl><Textarea placeholder="One item per line" {...field} rows={5} /></FormControl></FormItem> )} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link href="/admin/opportunities">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Link>
          </Button>
          <Button type="submit">{opportunity ? 'Save Changes' : 'Create Opportunity'}</Button>
        </div>
      </form>
    </Form>
  );
}
