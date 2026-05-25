'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import Navbar from '../components/Navbar';

interface Course {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  duration: string;
  students: number;
  image: string;
  description: string;
  coupon?: string;
  discount?: number;
  category: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Web Development Masterclass',
    price: 5000,
    originalPrice: 8000,
    duration: '3 months',
    students: 15420,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    description: 'Complete full-stack web development with React, Node.js, and modern tools',
    category: 'Programming'
  },
  {
    id: 2,
    title: 'UI/UX Design Pro',
    price: 3500,
    originalPrice: 5000,
    duration: '2 months',
    students: 8930,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    description: 'Master design thinking, Figma, and create stunning user experiences',
    category: 'Design'
  },
  {
    id: 3,
    title: 'Digital Marketing Expert',
    price: 2500,
    duration: '1.5 months',
    students: 22100,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    description: 'Learn SEO, social media marketing, and growth strategies',
    category: 'Marketing'
  },
  {
    id: 4,
    title: 'Python Data Science',
    price: 4500,
    originalPrice: 6000,
    duration: '2.5 months',
    students: 12800,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    description: 'Data analysis, machine learning, and AI fundamentals with Python',
    category: 'Data Science'
  }
];

// ✅ Categories - OUTSIDE component (global)
const categories = ['All', 'Programming', 'Design', 'Marketing', 'Data Science'];

export default function MainPage() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = () => setMenuOpen(false);
    if (menuOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto bg-[#111] rounded-2xl p-8 border border-green-900/50 glow-green">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 text-xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-white">15,000+</h3>
              <p className="text-green-600 text-sm">Active Students</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 text-xl">📖</span>
              </div>
              <h3 className="text-2xl font-bold text-white">200+</h3>
              <p className="text-green-600 text-sm">Premium Courses</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 text-xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-white">50+</h3>
              <p className="text-green-600 text-sm">Expert Instructors</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 text-xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-white">98%</h3>
              <p className="text-green-600 text-sm">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Dot Menu Section */}
      <section className="px-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center bg-[#111] rounded-xl p-4 border border-green-900/50 glow-green">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-5 bg-green-500 rounded-full"/>
            Quick Menu
          </h2>
          
          {/* Three Dot Menu - Animated Glow */}
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="text-green-400 p-2 hover:bg-green-900/30 rounded-lg transition-all glow-green"
            >
              <div className="flex flex-col gap-1.5 p-1">
                <div className={`w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-1 ${menuOpen ? 'bg-green-300' : ''}`}/>
                <div className={`w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-2 ${menuOpen ? 'bg-green-300' : ''}`}/>
                <div className={`w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-3 ${menuOpen ? 'bg-green-300' : ''}`}/>
              </div>
            </button>

            {menuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-green-500/50 rounded-xl shadow-2xl glow-green overflow-hidden backdrop-blur-sm z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {session ? (
                  <>
                    <div className="p-4 border-b border-green-900/50 bg-green-900/10">
                      <div className="flex flex-col items-center gap-3">
                        {session.user?.image ? (
                          <Image 
                            src={session.user.image} 
                            alt="Profile" 
                            width={60} 
                            height={60} 
                            className="rounded-full border-2 border-green-500 glow-green"
                          />
                        ) : (
                          <div className="w-[60px] h-[60px] rounded-full bg-green-900/50 border-2 border-green-500 flex items-center justify-center glow-green">
                            <span className="text-green-400 text-2xl">👤</span>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="text-green-400 font-bold">{session.user?.name || 'User'}</p>
                          <p className="text-green-600 text-xs">{session.user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-green-900/20 text-green-300 transition-colors text-sm">
                        <span className="text-lg">👤</span> 
                        <span>My Profile</span>
                      </Link>
                    </div>
                    
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
      </section>

      {/* Features Section */}
      <section className="px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-green-500 rounded-full"/>
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111] p-4 rounded-xl border border-green-900/50 hover:border-green-500/50 transition-all glow-green">
              <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-green-400 text-xl">🎯</span>
              </div>
              <h3 className="font-bold text-green-400 mb-1">Targeted Learning</h3>
              <p className="text-gray-500 text-xs">Personalized paths for every student</p>
            </div>
            
            <div className="bg-[#111] p-4 rounded-xl border border-green-900/50 hover:border-green-500/50 transition-all glow-green">
              <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-green-400 text-xl">🏆</span>
              </div>
              <h3 className="font-bold text-green-400 mb-1">Expert Mentors</h3>
              <p className="text-gray-500 text-xs">Learn from industry professionals</p>
            </div>
            
            <div className="bg-[#111] p-4 rounded-xl border border-green-900/50 hover:border-green-500/50 transition-all glow-green">
              <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-green-400 text-xl">📱</span>
              </div>
              <h3 className="font-bold text-green-400 mb-1">Mobile First</h3>
              <p className="text-gray-500 text-xs">Learn anywhere, anytime</p>
            </div>
            
            <div className="bg-[#111] p-4 rounded-xl border border-green-900/50 hover:border-green-500/50 transition-all glow-green">
              <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-green-400 text-xl">🎁</span>
              </div>
              <h3 className="font-bold text-green-400 mb-1">Smart Coupons</h3>
              <p className="text-gray-500 text-xs">Discounts tailored for you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-8">
        <div className="max-w-6xl mx-auto flex gap-3 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-green-600 text-black category-active' 
                  : 'bg-[#1a1a1a] text-green-400 border border-green-800 hover:border-green-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-green-500 rounded-full"/>
            Featured Courses
          </h2>

          <div className="space-y-4">
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-[#111] rounded-xl border border-green-900/50 overflow-hidden hover:border-green-500 transition-all glow-green"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Course Image */}
                  <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Course Info */}
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs text-green-600 bg-green-900/30 px-2 py-1 rounded">
                          {course.category}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2">{course.title}</h3>
                      </div>
                      <div className="text-right">
                        {course.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">৳{course.originalPrice}</span>
                        )}
                        <p className="text-2xl font-bold text-green-400">৳{course.price}</p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">{course.description}</p>

                    <div className="flex items-center gap-4 text-xs text-green-600 mb-3">
                      <span>⏱️ {course.duration}</span>
                      <span>👥 {course.students.toLocaleString()} students</span>
                    </div>

                    {course.coupon && (
                      <div className="bg-green-900/20 border border-green-500/30 rounded px-3 py-1 inline-block mb-3">
                        <span className="text-green-400 text-xs">🎫 {course.coupon} - {course.discount}% OFF</span>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button className="flex-1 bg-green-600 text-black py-2 rounded-lg font-bold hover:bg-green-500">
                        Enroll Now
                      </button>
                      <button className="px-4 py-2 border border-green-500 text-green-400 rounded-lg hover:bg-green-900/30">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
  }
