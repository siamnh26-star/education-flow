'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProfileData {
  name: string;
  image: string;
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<<ProfileData>({ name: '', image: '' });

  // Load profile from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('education_flow_profile');
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    const handleClick = () => setMenuOpen(false);
    if (menuOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [menuOpen]);

  const displayName = profile.name || session?.user?.name || 'User';
  const displayImage = profile.image || session?.user?.image || '';

  return (
    <nav className="bg-[#0a0a0a] p-4 border-b border-green-900/30 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Only */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 glow-blue">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100" 
              alt="Education Flow"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <span className="text-blue-500 font-bold text-lg block">Education</span>
            <span className="text-blue-400 text-sm">Flow</span>
          </div>
        </Link>

        {/* Right Side - Three Dot Only */}
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="text-green-400 p-2 hover:bg-green-900/20 rounded-lg transition-all glow-green"
          >
            <div className="flex flex-col gap-1.5 p-1">
              <div className={`w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-1 ${menuOpen ? 'bg-green-300' : ''}`}/>
              <div className={`w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-2 ${menuOpen ? 'bg-green-300' : ''}`}/>
              <div className={`w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-3 ${menuOpen ? 'bg-green-300' : ''}`}/>
            </div>
          </button>

          {menuOpen && (
            <div 
              className="absolute right-0 mt-2 w-64 bg-[#0a0a0a] border border-green-500/50 rounded-xl shadow-2xl glow-green overflow-hidden backdrop-blur-sm z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {session ? (
                <>
                  {/* Profile Section */}
                  <div className="p-4 border-b border-green-900/50 bg-green-900/10">
                    <div className="flex flex-col items-center gap-3">
                      {displayImage ? (
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-green-500 glow-green">
                          <img src={displayImage} alt="Profile" className="w-full h-full object-cover"/>
                        </div>
                      ) : (
                        <div className="w-[60px] h-[60px] rounded-full bg-green-900/50 border-2 border-green-500 flex items-center justify-center glow-green">
                          <span className="text-green-400 text-2xl">👤</span>
                        </div>
                      )}
                      <div className="text-center">
                        <p className="text-green-400 font-bold">{displayName}</p>
                        <p className="text-green-600 text-xs">{session.user?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items - Only Profile */}
                  <div className="py-1">
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-green-900/20 text-green-300 transition-colors text-sm">
                      <span className="text-lg">👤</span> 
                      <span>My Profile</span>
                    </Link>
                  </div>
                  
                  {/* Admin Only */}
                  {session.user?.email === 'your-admin-email@gmail.com' && (
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/20 text-blue-400 transition-colors text-sm border-t border-green-900/50">
                      <span className="text-lg">🔒</span> 
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  
                  <button 
                    onClick={() => signOut()}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-red-900/20 text-red-400 transition-colors border-t border-green-900/50 text-sm"
                  >
                    <span className="text-lg">🚪</span> 
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => signIn()}
                  className="w-full text-left flex items-center gap-3 px-4 py-4 hover:bg-green-900/20 text-green-400 transition-colors text-sm"
                >
                  <span className="text-lg">🔑</span> 
                  <span>Login with Google</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
        }
