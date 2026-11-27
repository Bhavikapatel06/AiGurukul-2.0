import type { Metadata, Viewport } from 'next';
import { Cinzel, Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/globals.css';
import { GlobalNavbar } from '../components/GlobalNavbar';
import { GlobalFooter } from '../components/GlobalFooter';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-serif',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'AI Gurukul 2.0 – Ancient Wisdom for Modern Life',
  description:
    'Production-grade Vedic intelligence platform: AI Guidance, Ayurveda Diagnostics, Vedic Knowledge Graph, Sacred RAG, and Interactive Quizzes.',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0D0B08',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }} suppressHydrationWarning>
        <GlobalNavbar />
        <main style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>{children}</main>
        <GlobalFooter />
      </body>
    </html>
  );
}
