import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ranablog.vercel.app/'),
  title: {
    default: 'RanaBlog | Blog with sanity cms & nextjs',
    template: '%s | RanaBlog | Blog with sanity cms & nextjs',
  },
  description:
    'RanaBlog offers professional coding problems solutions blog that explain complex topics in an easy-to-understand manner.',
  openGraph: {
    title: 'RanaBlog | Blog with sanity cms & nextjs',
    description:
      'RanaBlog offers professional coding problems solutions blog that explain complex topics in an easy-to-understand manner.',
    type: 'website',
    locale: 'en-US',
    url: 'https://ranablog.vercel.app',
    siteName: 'RanaBlog',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="max-w-2xl px-4 mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
