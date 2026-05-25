'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface EnrolledCourse {
  id: number;
  title: string;
  progress: number;
  image: string;
}

interface ProfileData {
  name: string;
  image: string;
  bio: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  
  const [profile, setProfile] = useState<<ProfileData>({
    name: '',
    image: '',
    bio: ''
  });
  
  const [enrolledCourses, setEnrolledCourses] = useState<<EnrolledCourse[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('education_flow_profile');
      const savedCourses = localStorage.getItem('education_flow_courses');
      
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else if (session?.user) {
        setProfile({
          name: session.user.name || '',
          image: session.user.image || '',
          bio: ''
        });
      }
      
      if (savedCourses) {
        setEnrolledCourses(JSON.parse(savedCourses));
      } else {
        // Demo courses
        setEnrolledCourses([
          { id: 1, title: 'Web Development Masterclass', progress: 75, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200' },
          { id: 2, title: 'UI/UX Design Pro', progress: 30, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200' },
        ]);
      }
      
      setLoading(false);
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-green-400">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('education_flow_profile', JSON.stringify(profile));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/main" className="text-green-400 hover:text-green-300 text-xl">←</Link>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-green-500 glow-green mb-4 bg-black relative">
            {profile.image ? (
              <img src={profile.image} alt="Profile" className="w-full h-full object-cover"/>
            ) : (
              <div className="w-full h-full bg-green-900/50 flex items-center justify-center">
                <span className="text-green-400 text-4xl">👤</span>
              </div>
            )}
          </div>
          
          {/* File Upload */}
          <label className="bg-green-900/30 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-green-900/50 transition-all mb-2">
            📷 Upload Photo
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </label>
          
          <p className="text-gray-500 text-xs">Or paste URL below</p>
          
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            className="bg-black border border-green-500 p-2 rounded text-green-400 text-sm w-full text-center mt-2"
            value={profile.image}
            onChange={(e) => setProfile({...profile, image: e.target.value})}
          />
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="text-green-400 text-sm mb-2 block font-bold">Display Name</label>
          <input
            type="text"
            className="bg-black border border-green-500 p-3 rounded text-green-400 w-full"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            placeholder="Enter your name"
          />
        </div>

        {/* Bio Input */}
        <div className="mb-4">
          <label className="text-green-400 text-sm mb-2 block font-bold">Bio</label>
          <textarea
            className="bg-black border border-green-500 p-3 rounded text-green-400 w-full h-20 resize-none"
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Email (Read Only) */}
        <div className="mb-6">
          <label className="text-green-400 text-sm mb-2 block font-bold">Email</label>
          <input
            type="text"
            readOnly
            className="bg-[#111] border border-green-900 p-3 rounded text-green-600 w-full"
            value={session.user?.email || ''}
          />
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="w-full bg-green-600 text-black py-3 rounded-lg font-bold hover:bg-green-500 mb-10 transition-all glow-green"
        >
          {saved ? '✅ Saved!' : '💾 Save Changes'}
        </button>

        {/* Enrolled Courses */}
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-green-500 rounded-full"/>
          My Enrolled Courses
        </h2>

        {enrolledCourses.length === 0 ? (
          <div className="bg-[#111] rounded-xl border border-green-900/50 p-6 text-center">
            <p className="text-gray-500">No courses enrolled yet</p>
            <Link href="/main" className="text-green-400 hover:text-green-300 text-sm mt-2 inline-block">
              Browse Courses →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-[#111] rounded-xl border border-green-900/50 p-3 flex items-center gap-3 glow-green">
                <img src={course.image} alt={course.title} className="w-16 h-16 rounded-lg object-cover"/>
                <div className="flex-1">
                  <h3 className="text-green-400 font-bold text-sm">{course.title}</h3>
                  <div className="w-full bg-black rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-green-600 text-xs">{course.progress}% Complete</p>
                    <span className="text-green-400 text-xs">{course.progress >= 100 ? '✅ Done' : '📖 Learning'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  }
