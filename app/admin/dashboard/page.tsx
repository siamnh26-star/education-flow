'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  limit: number;
  used: number;
  active: boolean;
  expiry: string;
  applicableCourses: number[];
}

interface Course {
  id: number;
  title: string;
  selected: boolean;
}

const ADMIN_EMAIL = 'your-admin-email@gmail.com'; // Change to your email

export default function AdminDashboard() {
  const { data: session } = useSession();

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [courses] = useState<Course[]>([
    { id: 1, title: 'Web Development', selected: false },
    { id: 2, title: 'UI/UX Design', selected: false },
    { id: 3, title: 'Digital Marketing', selected: false },
    { id: 4, title: 'Python Data Science', selected: false },
  ]);

  const [newCoupon, setNewCoupon] = useState({
    discount: '',
    limit: '',
    expiry: '',
    customCode: '',
    useCustom: false,
  });

  // Check admin
  if (!session || session.user?.email !== ADMIN_EMAIL) {
    redirect('/main');
  }

  // Generate Random Coupon
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const addCoupon = () => {
    const selectedCourseIds = courses.filter(c => c.selected).map(c => c.id);
    
    const coupon: Coupon = {
      id: Date.now().toString(),
      code: newCoupon.useCustom && newCoupon.customCode 
        ? newCoupon.customCode.toUpperCase() 
        : generateRandomCode(),
      discount: Number(newCoupon.discount),
      limit: Number(newCoupon.limit),
      used: 0,
      active: true,
      expiry: newCoupon.expiry || '2026-12-31',
      applicableCourses: selectedCourseIds.length > 0 ? selectedCourseIds : [1, 2, 3, 4],
    };
    
    setCoupons([...coupons, coupon]);
    setNewCoupon({ discount: '', limit: '', expiry: '', customCode: '', useCustom: false });
  };

  const toggleCourse = (id: number) => {
    courses.map(c => c.id === id ? { ...c, selected: !c.selected } : c);
  };

  const toggleCoupon = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-500">Admin Dashboard</h1>
            <p className="text-green-600">Manage coupons & courses</p>
          </div>
          <Link href="/main" className="text-green-400 border border-green-500 px-4 py-2 rounded hover:bg-green-900/30">
            ← Back to Site
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Active Coupons</h3>
            <p className="text-2xl font-bold text-white">{coupons.filter(c => c.active).length}</p>
          </div>
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Total Used</h3>
            <p className="text-2xl font-bold text-white">{coupons.reduce((a, c) => a + c.used, 0)}</p>
          </div>
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Expired</h3>
            <p className="text-2xl font-bold text-white">{coupons.filter(c => !c.active).length}</p>
          </div>
        </div>

        {/* Coupon Generator */}
        <div className="bg-[#111] rounded-xl border border-blue-900/50 p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-400 mb-4">🎫 Coupon Generator</h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="number"
              placeholder="Discount %"
              className="bg-black border border-blue-500 p-3 rounded text-blue-400"
              value={newCoupon.discount}
              onChange={e => setNewCoupon({...newCoupon, discount: e.target.value})}
            />
            <input
              type="number"
              placeholder="Usage Limit"
              className="bg-black border border-blue-500 p-3 rounded text-blue-400"
              value={newCoupon.limit}
              onChange={e => setNewCoupon({...newCoupon, limit: e.target.value})}
            />
            <input
              type="date"
              className="bg-black border border-blue-500 p-3 rounded text-blue-400"
              value={newCoupon.expiry}
              onChange={e => setNewCoupon({...newCoupon, expiry: e.target.value})}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newCoupon.useCustom}
                onChange={e => setNewCoupon({...newCoupon, useCustom: e.target.checked})}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-blue-400 text-sm">Custom Code</span>
            </div>
          </div>

          {newCoupon.useCustom && (
            <input
              type="text"
              placeholder="Enter Custom Code"
              className="bg-black border border-blue-500 p-3 rounded text-blue-400 w-full mb-4"
              value={newCoupon.customCode}
              onChange={e => setNewCoupon({...newCoupon, customCode: e.target.value})}
            />
          )}

          {/* Applicable Courses */}
          <div className="mb-4">
            <p className="text-blue-400 text-sm mb-2">Applicable Courses:</p>
            <div className="flex gap-2 flex-wrap">
              {courses.map(course => (
                <button
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  className={`px-3 py-1 rounded text-xs border ${
                    course.selected 
                      ? 'bg-blue-600 text-black border-blue-500' 
                      : 'bg-black text-blue-400 border-blue-800'
                  }`}
                >
                  {course.title}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={addCoupon}
            className="w-full bg-blue-600 text-black font-bold py-3 rounded hover:bg-blue-500"
          >
            {newCoupon.useCustom ? 'Create Custom Coupon' : 'Generate Random Coupon'}
          </button>
        </div>

        {/* Coupon List */}
        <div className="space-y-2">
          {coupons.map(coupon => (
            <div key={coupon.id} className="flex justify-between items-center p-4 bg-[#111] rounded border border-green-900/30">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono font-bold text-blue-400 text-lg">{coupon.code}</span>
                  <span className="text-green-400">{coupon.discount}% OFF</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${coupon.active ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                    {coupon.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="text-gray-500 text-xs">
                  Limit: {coupon.used}/{coupon.limit} | Exp: {coupon.expiry} | Courses: {coupon.applicableCourses.length}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleCoupon(coupon.id)} className="text-blue-400 border border-blue-500 px-3 py-1 rounded hover:bg-blue-900/30 text-sm">
                  Toggle
                </button>
                <button onClick={() => deleteCoupon(coupon.id)} className="text-red-400 border border-red-500 px-3 py-1 rounded hover:bg-red-900/30 text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
      }
