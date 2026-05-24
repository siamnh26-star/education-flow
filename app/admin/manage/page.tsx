'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  price: number;
  students: number;
  image: string;
}

interface Coupon {
  id: number;
  code: string;
  discount: number;
  active: boolean;
}

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: 'Web Development', price: 5000, students: 45, image: '' },
    { id: 2, title: 'Graphics Design', price: 3000, students: 30, image: '' }
  ]);

  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: 1, code: 'SAVE20', discount: 20, active: true }
  ]);

  const [newCourse, setNewCourse] = useState({ title: '', price: '', image: '' });
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '' });

  const addCourse = () => {
    if (newCourse.title && newCourse.price) {
      setCourses([...courses, {
        id: courses.length + 1,
        title: newCourse.title,
        price: Number(newCourse.price),
        students: 0,
        image: newCourse.image
      }]);
      setNewCourse({ title: '', price: '', image: '' });
    }
  };

  const addCoupon = () => {
    if (newCoupon.code && newCoupon.discount) {
      setCoupons([...coupons, {
        id: coupons.length + 1,
        code: newCoupon.code.toUpperCase(),
        discount: Number(newCoupon.discount),
        active: true
      }]);
      setNewCoupon({ code: '', discount: '' });
    }
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const toggleCoupon = (id: number) => {
    setCoupons(coupons.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-500">Manage Courses</h1>
        <Link href="/admin/dashboard" className="text-green-400 border border-green-500 px-4 py-2 rounded hover:bg-green-900">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Add Course */}
      <div className="bg-gray-900 p-4 rounded border border-green-500 mb-6">
        <h3 className="text-xl mb-4 text-green-300">Add New Course</h3>
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder="Course name"
            className="bg-black border border-green-500 p-2 rounded text-green-400 flex-1"
            value={newCourse.title}
            onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            className="bg-black border border-green-500 p-2 rounded text-green-400 w-24"
            value={newCourse.price}
            onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Image URL (optional)"
            className="bg-black border border-green-500 p-2 rounded text-green-400 flex-1"
            value={newCourse.image}
            onChange={(e) => setNewCourse({...newCourse, image: e.target.value})}
          />
          <button 
            onClick={addCourse}
            className="bg-green-600 text-black px-6 py-2 rounded font-bold hover:bg-green-500"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* Coupon Management */}
      <div className="bg-gray-900 p-4 rounded border border-blue-500 mb-6">
        <h3 className="text-xl mb-4 text-blue-300">🎫 Coupon Management</h3>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Coupon code"
            className="bg-black border border-blue-500 p-2 rounded text-blue-400 flex-1"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
          />
          <input
            type="number"
            placeholder="Discount %"
            className="bg-black border border-blue-500 p-2 rounded text-blue-400 w-24"
            value={newCoupon.discount}
            onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
          />
          <button 
            onClick={addCoupon}
            className="bg-blue-600 text-black px-6 py-2 rounded font-bold hover:bg-blue-500"
          >
            Add Coupon
          </button>
        </div>

        {/* Coupon List */}
        <div className="space-y-2">
          {coupons.map(coupon => (
            <div key={coupon.id} className="flex justify-between items-center p-3 bg-black rounded border border-blue-500">
              <div>
                <span className="font-bold text-blue-400">{coupon.code}</span>
                <span className="text-blue-300 ml-2">{coupon.discount}% OFF</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${coupon.active ? 'bg-green-600 text-black' : 'bg-red-600 text-white'}`}>
                  {coupon.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <button 
                onClick={() => toggleCoupon(coupon.id)}
                className="text-blue-400 border border-blue-500 px-3 py-1 rounded hover:bg-blue-900"
              >
                Toggle
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="bg-gray-900 rounded border border-green-500">
        {courses.map(course => (
          <div key={course.id} className="flex justify-between items-center p-4 border-b border-green-800 last:border-0">
            <div className="flex items-center gap-3">
              {course.image && (
                <img src={course.image} alt={course.title} className="w-12 h-12 rounded object-cover" />
              )}
              <div>
                <h4 className="font-bold text-lg text-green-400">{course.title}</h4>
                <p className="text-green-300">৳{course.price} | {course.students} students</p>
              </div>
            </div>
            <button 
              onClick={() => deleteCourse(course.id)}
              className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-900"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
                 }
