'use client';

import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded border border-green-500 text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-2">Education Flow</h1>
        <p className="text-green-300 mb-8">Sign in to continue</p>
        
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full bg-green-600 text-black px-6 py-3 rounded font-bold hover:bg-green-500 flex items-center justify-center gap-2"
        >
          <span className="text-xl">G</span>
          Sign in with Google
        </button>
        
        <Link href="/" className="block mt-6 text-green-400 hover:text-green-300">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
