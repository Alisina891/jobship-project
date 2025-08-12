import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { PT_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { DirectionProvider } from '@/components/layout/direction-provider';
import { InstallPwaPrompt } from '@/components/layout/install-pwa-prompt';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans'
});

export const metadata: Metadata = {
  title: 'Bepall Opportunities',
  description: 'A platform that connects job seekers and students with career and scholarship opportunities.',
  manifest: '/manifest.json',
  themeColor: '#22A568',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-body antialiased', ptSans.variable)}>
        <DirectionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <InstallPwaPrompt />
          </ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
