'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-900 p-4 border-b border-green-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-green-400">
          Education Flow
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-green-300 text-green-400">Home</Link>
          <Link href="/courses" className="hover:text-green-300 text-green-400">Courses</Link>
          <Link href="/about" className="hover:text-green-300 text-green-400">About</Link>
          
          {status === 'loading' ? (
            <span className="text-green-300">Loading...</span>
          ) : session ? (
            <div className="flex items-center space-x-3">
              <span className="text-green-300 text-sm hidden md:block">
                {session.user?.name}
              </span>
              <Link 
                href="/admin/dashboard"
                className="bg-green-600 text-black px-3 py-1 rounded font-bold text-sm hover:bg-green-500"
              >
                Admin
              </Link>
              <button 
                onClick={() => signOut()}
                className="bg-red-600 text-white px-3 py-1 rounded font-bold text-sm hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signIn()}
              className="bg-green-600 text-black px-4 py-2 rounded font-bold hover:bg-green-500"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
                }
