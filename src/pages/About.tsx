function About() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-400 mb-6">About Education Flow</h1>
      
      <div className="bg-gray-900 p-6 rounded border border-green-500 mb-6">
        <p className="text-lg mb-4">
          Education Flow is a modern e-learning platform designed to help students 
          learn practical skills from industry experts.
        </p>
        <p className="text-lg mb-4">
          Our mission is to make quality education accessible to everyone through 
          affordable, hands-on courses.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-4 rounded border border-green-500 text-center">
          <h3 className="text-2xl font-bold text-green-400">500+</h3>
          <p>Students Enrolled</p>
        </div>
        <div className="bg-gray-900 p-4 rounded border border-green-500 text-center">
          <h3 className="text-2xl font-bold text-green-400">20+</h3>
          <p>Expert Instructors</p>
        </div>
      </div>
    </div>
  );
}

export default About;
