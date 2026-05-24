import { useState } from 'react';

function Courses() {
  const [courses] = useState([
    { id: 1, title: 'Web Development', price: 5000, duration: '3 months', students: 45 },
    { id: 2, title: 'Graphics Design', price: 3000, duration: '2 months', students: 30 },
    { id: 3, title: 'Digital Marketing', price: 2500, duration: '1.5 months', students: 25 },
    { id: 4, title: 'Python Programming', price: 4000, duration: '2.5 months', students: 35 }
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Our Courses</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-gray-900 p-6 rounded border border-green-500">
            <h3 className="text-xl font-bold text-green-400 mb-2">{course.title}</h3>
            <p className="text-green-300 mb-1">⏱️ Duration: {course.duration}</p>
            <p className="text-green-300 mb-1">👥 Students: {course.students}</p>
            <p className="text-2xl font-bold text-green-400 mt-3">৳{course.price}</p>
            <button className="bg-green-600 text-black px-6 py-2 rounded font-bold mt-4 w-full hover:bg-green-500">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
