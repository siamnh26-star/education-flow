import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-6">
      {/* Hero Section - BLUE+BLACK */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-blue-500 mb-4 animate-pulse">
          Education Flow
        </h1>
        <p className="text-xl text-blue-300 mb-8">
          Learn Skills, Build Future
        </p>
        <Link 
          href="/courses" 
          className="bg-blue-600 text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-500 inline-block"
        >
          Browse Courses
        </Link>
      </div>

      {/* Features - GREEN+BLACK */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="bg-gray-900 p-6 rounded border border-green-500 text-center">
          <h3 className="text-xl font-bold text-green-400 mb-2">🎓 Quality Courses</h3>
          <p className="text-green-300">Expert led professional courses</p>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-green-500 text-center">
          <h3 className="text-xl font-bold text-green-400 mb-2">💼 Job Ready</h3>
          <p className="text-green-300">Industry standard curriculum</p>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-green-500 text-center">
          <h3 className="text-xl font-bold text-green-400 mb-2">🚀 Lifetime Access</h3>
          <p className="text-green-300">Learn at your own pace</p>
        </div>
      </div>
    </div>
  );
      }
