
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Briefcase, PlusCircle, Building2, Settings } from 'lucide-react';
import type React from 'react';
import { Button } from '@/components/ui/button';

const employerNavLinks = [
  { href: '/employer', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/employer/jobs', label: 'Manage Jobs', icon: Briefcase },
  { href: '/employer/post-job', label: 'Post a Job', icon: PlusCircle },
  { href: '/employer/profile', label: 'Company Profile', icon: Building2 },
  { href: '/employer/settings', label: 'Settings', icon: Settings },
];

function EmployerNavLink({ href, label, icon: Icon, isActive }: { href: string; label: string; icon: React.ElementType; isActive: boolean }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: label }}>
        <Link href={href}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex h-12 items-center justify-between p-2 group-data-[collapsible=icon]:justify-center">
            <Button variant="ghost" className="h-fit p-1 group-data-[collapsible=icon]:hidden" asChild>
              <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="font-headline text-sidebar-foreground">Bepall Employer</span>
              </Link>
            </Button>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {employerNavLinks.map((link) => (
              <EmployerNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                isActive={pathname === link.href || (link.href !== '/employer' && pathname.startsWith(link.href))}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
