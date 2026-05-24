'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ManageCourses() {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Web Development', price: 5000, students: 45 },
    { id: 2, title: 'Graphics Design', price: 3000, students: 30 }
  ]);

  const [newCourse, setNewCourse] = useState({ title: '', price: '' });

  const addCourse = () => {
    if (newCourse.title && newCourse.price) {
      setCourses([...courses, {
        id: courses.length + 1,
        title: newCourse.title,
        price: Number(newCourse.price),
        students: 0
      }]);
      setNewCourse({ title: '', price: '' });
    }
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-400">Manage Courses</h1>
        <Link href="/admin/dashboard" className="text-green-400 border border-green-500 px-4 py-2 rounded hover:bg-green-900">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-gray-900 p-4 rounded border border-green-500 mb-6">
        <h3 className="text-xl mb-4 text-green-300">Add New Course</h3>
        <div className="flex gap-3">
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
          <button 
            onClick={addCourse}
            className="bg-green-600 text-black px-6 py-2 rounded font-bold hover:bg-green-500"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded border border-green-500">
        {courses.map(course => (
          <div key={course.id} className="flex justify-between items-center p-4 border-b border-green-800 last:border-0">
            <div>
              <h4 className="font-bold text-lg text-green-400">{course.title}</h4>
              <p className="text-green-300">৳{course.price} | {course.students} students</p>
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
