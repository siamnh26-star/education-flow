'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface EnrolledCourse {
  id: number;
  title: string;
  progress: number;
  image: string;
}

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [image, setImage] = useState(session?.user?.image || '');
  const [saved, setSaved] = useState(false);

  // Demo enrolled courses
  const [enrolledCourses] = useState<<EnrolledCourse[]>([
    { id: 1, title: 'Web Development', progress: 75, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200' },
    { id: 2, title: 'UI/UX Design', progress: 30, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200' },
  ]);

  if (!session) {
    redirect('/auth/signin');
  }

  const handleSave = async () => {
    // In real app, this would update the database
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/main" className="text-green-400 hover:text-green-300">← Back</Link>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-500 glow-green mb-3">
            {image ? (
              <img src={image} alt="Profile" className="w-full h-full object-cover"/>
            ) : (
              <div className="w-full h-full bg-green-900/50 flex items-center justify-center">
                <span className="text-green-400 text-3xl">👤</span>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Profile Image URL"
            className="bg-black border border-green-500 p-2 rounded text-green-400 text-sm w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label className="text-green-400 text-sm mb-2 block">Display Name</label>
          <input
            type="text"
            className="bg-black border border-green-500 p-3 rounded text-green-400 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="w-full bg-green-600 text-black py-3 rounded-lg font-bold hover:bg-green-500 mb-8"
        >
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>

        {/* Enrolled Courses */}
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-green-500 rounded-full"/>
          My Courses
        </h2>

        <div className="space-y-3">
          {enrolledCourses.map(course => (
            <div key={course.id} className="bg-[#111] rounded-xl border border-green-900/50 p-3 flex items-center gap-3">
              <img src={course.image} alt={course.title} className="w-16 h-16 rounded-lg object-cover"/>
              <div className="flex-1">
                <h3 className="text-green-400 font-bold text-sm">{course.title}</h3>
                <div className="w-full bg-black rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-green-600 text-xs mt-1">{course.progress}% Complete</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                                   }
