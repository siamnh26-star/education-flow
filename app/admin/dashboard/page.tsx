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
}

interface Course {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  category: string;
  coupon?: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: '1', code: 'SAVE20', discount: 20, limit: 100, used: 45, active: true, expiry: '2026-12-31' }
  ]);

  const [newCoupon, setNewCoupon] = useState({
    discount: '',
    limit: '',
    expiry: ''
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    price: '',
    originalPrice: '',
    image: '',
    description: '',
    category: 'Programming',
    coupon: ''
  });

  // Generate Random Coupon
  const generateCoupon = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const addCoupon = () => {
    if (newCoupon.discount && newCoupon.limit) {
      const coupon: Coupon = {
        id: Date.now().toString(),
        code: generateCoupon(),
        discount: Number(newCoupon.discount),
        limit: Number(newCoupon.limit),
        used: 0,
        active: true,
        expiry: newCoupon.expiry || '2026-12-31'
      };
      setCoupons([...coupons, coupon]);
      setNewCoupon({ discount: '', limit: '', expiry: '' });
    }
  };

  const addCourse = () => {
    if (newCourse.title && newCourse.price) {
      const course: Course = {
        id: Date.now(),
        title: newCourse.title,
        price: Number(newCourse.price),
        originalPrice: Number(newCourse.originalPrice) || Number(newCourse.price),
        image: newCourse.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        description: newCourse.description,
        category: newCourse.category,
        coupon: newCourse.coupon || undefined
      };
      setCourses([...courses, course]);
      setNewCourse({
        title: '', price: '', originalPrice: '', image: '', description: '', category: 'Programming', coupon: ''
      });
    }
  };

  const toggleCoupon = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-500">Admin Dashboard</h1>
            <p className="text-green-600">Manage courses, coupons & content</p>
          </div>
          <Link href="/main" className="text-green-400 border border-green-500 px-4 py-2 rounded hover:bg-green-900/30">
            ← Back to Site
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Total Courses</h3>
            <p className="text-2xl font-bold text-white">{courses.length}</p>
          </div>
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Active Coupons</h3>
            <p className="text-2xl font-bold text-white">{coupons.filter(c => c.active).length}</p>
          </div>
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Total Students</h3>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Revenue</h3>
            <p className="text-2xl font-bold text-green-400">৳0</p>
          </div>
        </div>

        {/* Coupon Management */}
        <div className="bg-[#111] rounded-xl border border-blue-900/50 p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <span>🎫</span> Coupon Management
          </h2>

          {/* Add Coupon */}
          <div className="grid grid-cols-4 gap-3 mb-6">
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
            <button 
              onClick={addCoupon}
              className="bg-blue-600 text-black font-bold rounded hover:bg-blue-500"
            >
              Generate Coupon
            </button>
          </div>

          {/* Coupon List */}
          <div className="space-y-2">
            {coupons.map(coupon => (
              <div key={coupon.id} className="flex justify-between items-center p-3 bg-black rounded border border-blue-900/30">
                <div className="flex gap-4 items-center">
                  <span className="font-mono font-bold text-blue-400 text-lg">{coupon.code}</span>
                  <span className="text-green-400">{coupon.discount}% OFF</span>
                  <span className="text-gray-500 text-sm">Limit: {coupon.used}/{coupon.limit}</span>
                  <span className="text-gray-500 text-sm">Exp: {coupon.expiry}</span>
                  <span className={`px-2 py-1 rounded text-xs ${coupon.active ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                    {coupon.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleCoupon(coupon.id)} className="text-blue-400 border border-blue-500 px-3 py-1 rounded hover:bg-blue-900/30">
                    Toggle
                  </button>
                  <button onClick={() => deleteCoupon(coupon.id)} className="text-red-400 border border-red-500 px-3 py-1 rounded hover:bg-red-900/30">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Management */}
        <div className="bg-[#111] rounded-xl border border-green-900/50 p-6">
          <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span>📚</span> Course Management
          </h2>

          {/* Add Course */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <input
              type="text"
              placeholder="Course Title"
              className="bg-black border border-green-500 p-3 rounded text-green-400"
              value={newCourse.title}
              onChange={e => setNewCourse({...newCourse, title: e.target.value})}
            />
            <input
              type="number"
              placeholder="Price (৳)"
              className="bg-black border border-green-500 p-3 rounded text-green-400"
              value={newCourse.price}
              onChange={e => setNewCourse({...newCourse, price: e.target.value})}
            />
            <input
              type="number"
              placeholder="Original Price (৳)"
              className="bg-black border border-green-500 p-3 rounded text-green-400"
              value={newCourse.originalPrice}
              onChange={e => setNewCourse({...newCourse, originalPrice: e.target.value})}
            />
            <select
              className="bg-black border border-green-500 p-3 rounded text-green-400"
              value={newCourse.category}
              onChange={e => setNewCourse({...newCourse, category: e.target.value})}
            >
              <option>Programming</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Data Science</option>
              <option>Business</option>
            </select>
            <input
              type="text"
              placeholder="Image URL"
              className="bg-black border border-green-500 p-3 rounded text-green-400 col-span-2"
              value={newCourse.image}
              onChange={e => setNewCourse({...newCourse, image: e.target.value})}
            />
            <textarea
              placeholder="Description"
              className="bg-black border border-green-500 p-3 rounded text-green-400 col-span-2 h-20"
              value={newCourse.description}
              onChange={e => setNewCourse({...newCourse, description: e.target.value})}
            />
            <input
              type="text"
              placeholder="Coupon Code (optional)"
              className="bg-black border border-green-500 p-3 rounded text-green-400"
              value={newCourse.coupon}
              onChange={e => setNewCourse({...newCourse, coupon: e.target.value})}
            />
            <button 
              onClick={addCourse}
              className="bg-green-600 text-black font-bold rounded hover:bg-green-500"
            >
              Add Course
            </button>
          </div>

          {/* Course List */}
          <div className="space-y-2">
            {courses.map(course => (
              <div key={course.id} className="flex justify-between items-center p-3 bg-black rounded border border-green-900/30">
                <div className="flex gap-3 items-center">
                  <img src={course.image} alt={course.title} className="w-12 h-12 rounded object-cover"/>
                  <div>
                    <h4 className="font-bold text-green-400">{course.title}</h4>
                    <p className="text-sm text-gray-500">৳{course.price} | {course.category}</p>
                  </div>
                </div>
                <button className="text-red-400 border border-red-500 px-3 py-1 rounded hover:bg-red-900/30">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
     }
