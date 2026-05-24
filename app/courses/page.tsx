'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Course {
  id: number;
  title: string;
  price: number;
  duration: string;
  students: number;
  image: string;
  coupon?: string;
  discountPrice?: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    { 
      id: 1, 
      title: 'Web Development', 
      price: 5000, 
      duration: '3 months', 
      students: 45,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
    },
    { 
      id: 2, 
      title: 'Graphics Design', 
      price: 3000, 
      duration: '2 months', 
      students: 30,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
    },
    { 
      id: 3, 
      title: 'Digital Marketing', 
      price: 2500, 
      duration: '1.5 months', 
      students: 25,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
    },
    { 
      id: 4, 
      title: 'Python Programming', 
      price: 4000, 
      duration: '2.5 months', 
      students: 35,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const applyCoupon = () => {
    // Demo coupon: SAVE20 = 20% off
    if (couponCode === 'SAVE20') {
      setAppliedCoupon('SAVE20');
      setCourses(courses.map(c => ({
        ...c,
        discountPrice: Math.round(c.price * 0.8)
      })));
      alert('Coupon applied! 20% off');
    } else {
      alert('Invalid coupon');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Our Courses</h1>
      
      {/* Coupon Section */}
      <div className="bg-gray-900 p-4 rounded border border-green-500 mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="bg-black border border-green-500 p-2 rounded text-green-400 flex-1"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
        />
        <button 
          onClick={applyCoupon}
          className="bg-green-600 text-black px-6 py-2 rounded font-bold hover:bg-green-500"
        >
          Apply Coupon
        </button>
      </div>

      {appliedCoupon && (
        <div className="bg-green-900 p-3 rounded mb-6 text-green-300">
          ✅ Coupon <strong>{appliedCoupon}</strong> applied! 20% off on all courses
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-gray-900 rounded border border-green-500 overflow-hidden">
            {/* Course Image */}
            <div className="relative h-48 w-full">
              <Image 
                src={course.image} 
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-400 mb-2">{course.title}</h3>
              <p className="text-green-300 mb-1">⏱️ Duration: {course.duration}</p>
              <p className="text-green-300 mb-1">👥 Students: {course.students}</p>
              
              {/* Price */}
              <div className="mt-3">
                {course.discountPrice ? (
                  <div>
                    <span className="text-lg text-gray-500 line-through">৳{course.price}</span>
                    <span className="text-2xl font-bold text-green-400 ml-2">৳{course.discountPrice}</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-green-400">৳{course.price}</p>
                )}
              </div>
              
              <button className="bg-green-600 text-black px-6 py-2 rounded font-bold mt-4 w-full hover:bg-green-500">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
      }
