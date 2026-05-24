import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Admin Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 p-6 rounded border border-green-500">
          <h3 className="text-xl mb-2">Total Courses</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-green-500">
          <h3 className="text-xl mb-2">Total Students</h3>
          <p className="text-3xl font-bold">120</p>
        </div>
      </div>

      <div className="space-y-4">
        <Link to="/admin/courses" className="block bg-green-600 text-black p-4 rounded font-bold text-center">
          📚 Manage Courses
        </Link>
        <Link to="/" className="block bg-gray-800 text-green-400 p-4 rounded text-center border border-green-500">
          🔙 Back to Website
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
