'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="p-6 text-green-400">Loading...</div>;
  }

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Admin Dashboard</h1>
      
      <div className="bg-gray-900 p-4 rounded border border-green-500 mb-6">
        <p className="text-green-300">Welcome, {session.user?.name}!</p>
        <p className="text-green-300 text-sm">{session.user?.email}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 p-6 rounded border border-green-500">
          <h3 className="text-xl mb-2 text-green-300">Total Courses</h3>
          <p className="text-3xl font-bold text-green-400">5</p>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-green-500">
          <h3 className="text-xl mb-2 text-green-300">Total Students</h3>
          <p className="text-3xl font-bold text-green-400">120</p>
        </div>
      </div>

      <div className="space-y-4">
        <Link href="/admin/manage" className="block bg-green-600 text-black p-4 rounded font-bold text-center hover:bg-green-500">
          📚 Manage Courses
        </Link>
        <Link href="/" className="block bg-gray-800 text-green-400 p-4 rounded text-center border border-green-500 hover:bg-gray-700">
          🔙 Back to Website
        </Link>
      </div>
    </div>
  );
        }
