'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-[#0a0a0a] p-4 border-b border-green-900/30 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center glow-blue">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div className="leading-none">
            <span className="text-blue-500 font-bold text-sm block">Education</span>
            <span className="text-blue-400 text-xs">Flow</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/main" className="hover:text-green-300 text-green-400 text-sm">Courses</Link>
          <Link href="/about" className="hover:text-green-300 text-green-400 text-sm">About</Link>
          
          {status === 'loading' ? (
            <span className="text-green-300 text-sm">...</span>
          ) : session ? (
            <div className="flex items-center space-x-2">
              {session.user?.image && (
                <Image 
                  src={session.user.image} 
                  alt="Profile" 
                  width={28} 
                  height={28} 
                  className="rounded-full border border-green-500"
                />
              )}
              <button 
                onClick={() => signOut()}
                className="bg-red-600/80 text-white px-2 py-1 rounded text-xs hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signIn()}
              className="bg-green-600 text-black px-3 py-1 rounded text-sm font-bold hover:bg-green-500"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
          }
