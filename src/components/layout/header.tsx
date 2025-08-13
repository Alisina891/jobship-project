
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Home, Info, FileText, Mail, Globe, LogIn, UserPlus, LayoutDashboard, Building2, ChevronDown, User, Compass, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { useDirection } from './direction-provider';
import { Separator } from '../ui/separator';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/opportunities', label: 'Opportunities', icon: Compass },
  { href: '/rfqs-rfps', label: 'RFQs & RFPs', icon: FileText },
  { href: '/contact', label: 'Contact Us', icon: Mail },
];

const moreLinks = [
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/employer', label: 'Employer', icon: Building2 },
    { href: '/admin', label: 'Admin', icon: LayoutDashboard },
];

const mobileBottomNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/opportunities', label: 'Opportunities', icon: Compass },
  { href: '/profile', label: 'Profile', icon: User },
];

const tabletNavLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/opportunities', label: 'Opportunities', icon: Compass },
    { href: '/rfqs-rfps', label: 'RFQs & RFPs', icon: FileText },
    { href: '/profile', label: 'Profile', icon: User },
];

const moreDialogLinks: ({href: string; label: string; icon: React.ElementType} | {type: 'separator'})[] = [
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/contact', label: 'Contact Us', icon: Mail },
    { href: '/rfqs-rfps', label: 'RFQs & RFPs', icon: FileText },
    { type: 'separator' },
    { href: '/login', label: 'Sign In', icon: LogIn },
    { href: '/signup', label: 'Sign Up', icon: UserPlus },
    { type: 'separator' },
    { href: '/employer', label: 'Employer', icon: Building2 },
    { href: '/admin', label: 'Admin', icon: LayoutDashboard },
];


function LanguageSwitcher() {
  const { setDirection } = useDirection();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDirection('ltr')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDirection('rtl')}>دری (Dari)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HeaderLink({ href, label, icon: Icon, isActive, isDesktop=false }: { href: string; label: string; icon: React.ComponentType<{className?: string}>; isActive: boolean, isDesktop?: boolean }) {
    return (
      <Link
        href={href}
        className={cn(
          'flex items-center transition-colors',
          isDesktop
            ? 'gap-1.5 text-base font-medium'
            : 'gap-4 rounded-lg px-3 py-2 text-lg font-medium',
          isActive
            ? (isDesktop ? 'text-primary' : 'bg-muted text-primary')
            : (isDesktop ? 'text-muted-foreground hover:text-primary' : 'text-muted-foreground hover:text-primary')
        )}
      >
        <Icon className={cn(isDesktop ? 'h-4 w-4' : 'h-5 w-5')} />
        {label}
      </Link>
    );
};

function BottomNavLink({ href, label, icon: Icon, isActive, isPill = false }: { href: string; label: string; icon: React.ComponentType<{className?: string}>; isActive: boolean; isPill?: boolean; }) {
  return (
     <Link
        href={href}
        className={cn(
          'flex flex-col items-center justify-center gap-1 transition-colors h-16',
          isPill ? 'rounded-full py-2 px-5 whitespace-nowrap' : 'w-16 p-2 rounded-md',
          isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary'
        )}
      >
        <Icon className='h-5 w-5 mb-0.5' />
        <span className='text-xs font-medium'>{label}</span>
      </Link>
  )
}


function MoreMenuButton({ isPill = false }: { isPill?: boolean }) {
    const pathname = usePathname();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={cn(
                    'flex flex-col items-center justify-center gap-1 p-2 transition-colors h-16 text-muted-foreground hover:text-primary',
                    isPill ? 'rounded-full px-5 py-2' : 'w-16 rounded-md'
                )}>
                    <MoreHorizontal className="h-5 w-5 mb-0.5" />
                    <span className="text-xs font-medium">More</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                    <DialogTitle>More Options</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 pt-4">
                    {moreDialogLinks.map((link, index) => {
                        if (link.type === 'separator') {
                            return <Separator key={`sep-${index}`} className="my-2" />;
                        }
                        return (
                            <DialogClose key={link.href} asChild>
                                <HeaderLink
                                    href={link.href!}
                                    label={link.label!}
                                    icon={link.icon!}
                                    isActive={pathname === link.href || (link.href! !== '/' && pathname.startsWith(link.href!))}
                                />
                            </DialogClose>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function Header() {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <header className={cn("sticky top-0 z-50 w-full border-b",
        isMobile ? 'bg-transparent' : 'bg-background/80 backdrop-blur-sm'
      )}>
        <div className="container relative flex h-20 items-center">
          <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <span className="font-headline text-foreground">Bepall</span>
              </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden items-center space-x-6 text-sm font-medium lg:flex">
            {navLinks.map((link) => (
              <HeaderLink
                key={link.href}
                {...link}
                isActive={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
                isDesktop={true}
                
              />
            ))}
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-base font-medium transition-colors hover:text-primary text-muted-foreground focus:outline-none">
                  More
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {moreLinks.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                          <Link href={link.href}>
                              <link.icon className="mr-2 h-4 w-4" />
                              <span>{link.label}</span>
                          </Link>
                      </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <div className="hidden lg:flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login" title="Sign In">
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Link>
              </Button>
              <Button size="icon" asChild>
                <Link href="/signup" title="Sign Up">
                  <UserPlus className="h-5 w-5" />
                  <span className="sr-only">Sign Up</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* This block will only render on the client, preventing the hydration error. */}
      {hasMounted && (
        <>
            {/* Mobile Bottom Navigation (Full-width) */}
            <div className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur-sm sm:hidden">
                <nav className="flex h-16 items-center justify-around">
                    {mobileBottomNavLinks.map((link) => (
                        <BottomNavLink
                            key={link.href}
                            {...link}
                            isActive={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
                        />
                    ))}
                    <MoreMenuButton />
                </nav>
            </div>

            {/* Tablet Bottom Navigation (Floating Pill) */}
            <div className="fixed bottom-4 inset-x-0 z-40 hidden sm:flex lg:hidden justify-center pointer-events-none">
                <nav className="flex items-center gap-2 rounded-full bg-background/95 p-1 shadow-lg ring-1 ring-black/5 backdrop-blur-sm pointer-events-auto">
                    {tabletNavLinks.map((link) => (
                    <BottomNavLink
                        key={link.href}
                        {...link}
                        isPill={true}
                        isActive={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
                    />
                    ))}
                    <MoreMenuButton isPill={true} />
                </nav>
            </div>
        </>
      )}
    </>
  );
}
