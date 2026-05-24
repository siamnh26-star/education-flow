import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 border-b border-green-500">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-400">
          Education Flow
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-green-300">Home</Link>
          <Link to="/courses" className="hover:text-green-300">Courses</Link>
          <Link to="/about" className="hover:text-green-300">About</Link>
          <Link to="/admin" className="bg-green-600 text-black px-4 py-2 rounded font-bold">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
