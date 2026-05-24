import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Education Flow',
  description: 'Learn Skills, Build Future',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-green-400 min-h-screen`}>
        <Navbar />
        <main className="max-w-6xl mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
