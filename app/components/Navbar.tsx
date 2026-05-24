import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 border-b border-green-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-green-400">
          Education Flow
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-green-300 text-green-400">Home</Link>
          <Link href="/courses" className="hover:text-green-300 text-green-400">Courses</Link>
          <Link href="/about" className="hover:text-green-300 text-green-400">About</Link>
          <Link href="/admin/dashboard" className="bg-green-600 text-black px-4 py-2 rounded font-bold hover:bg-green-500">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
