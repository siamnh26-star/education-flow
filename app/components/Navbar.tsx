'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-[#0f0f0f] p-4 border-b border-green-900/50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo - Blue+Black */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center glow-blue">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <div className="leading-none">
            <span className="text-blue-500 font-bold text-lg block">Education</span>
            <span className="text-blue-400 text-sm">Flow</span>
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/main" className="hover:text-green-300 text-green-400">Courses</Link>
          <Link href="/about" className="hover:text-green-300 text-green-400">About</Link>
          
          {status === 'loading' ? (
            <span className="text-green-300">...</span>
          ) : session ? (
            <div className="flex items-center space-x-3">
              {session.user?.image && (
                <Image 
                  src={session.user.image} 
                  alt="Profile" 
                  width={32} 
                  height={32} 
                  className="rounded-full border-2 border-green-500"
                />
              )}
              <button 
                onClick={() => signOut()}
                className="bg-red-600/80 text-white px-3 py-1 rounded text-sm hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signIn()}
              className="bg-green-600 text-black px-4 py-2 rounded font-bold hover:bg-green-500 glow-green"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
            }
