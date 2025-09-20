"use client"
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, FileText, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { checkEmployer } from '@/components/ui/checkEmployer';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';


export default function EmployerDashboardPage() {


  const [mounted , setMounted ] = useState(false)
      const router = useRouter();
  
     useEffect(() => {
        setMounted(true); // پس از mount شدن صفحه
      }, []);


      useEffect(() => {
        
        if (!mounted) return;

        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login"); // لاگین نشده
          return;
        }

        checkEmployer(token).then((isEmployer) => {
          if (!isEmployer) {
            router.replace("/login"); // نقش اشتباه
          }
        }).catch((err) => {
          console.error(err);
          router.replace("/login"); // اگر خطایی رخ دهد، به لاگین برگردان
        });
      }, [mounted, router]);



  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
         <Button asChild>
            <Link href="/employer/post-job">
              <PlusCircle className="mr-2 h-4 w-4" /> Post a New Job
            </Link>
         </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Job Listings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+150 new applicants this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+5 today</p>
          </CardContent>
        </Card>
      </div>
       <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-center py-16 text-muted-foreground">
                  <p>Recent applicant feed coming soon...</p>
               </div>
            </CardContent>
          </Card>
       </div>
    </div>
  );
}
