'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 2.1 Try to login
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: unknown) {
      const loginError = error as { code?: string; message: string };
      console.log('Login error code:', loginError.code);
      // 2.2 If user not found, create new account
      if (loginError.code === 'auth/user-not-found' || loginError.code === 'auth/invalid-credential') {
        // Note: auth/invalid-credential might be returned for both wrong password and user not found 
        // if email enumeration protection is on. 
        // However, strictly following the requirement "If not exist, create", 
        // we might try to create if login fails. 
        // But if it was just a wrong password, creating will fail with 'auth/email-already-in-use'.
        
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          router.push('/');
        } catch (err: unknown) {
            const createError = err as { code?: string; message: string };
            if (createError.code === 'auth/email-already-in-use') {
                 // This means the user actually existed but the password was wrong in the first place
                 setError('Incorrect password.');
            } else {
                 setError(createError.message);
            }
        }
      } else {
        setError(loginError.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login / Signup</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
