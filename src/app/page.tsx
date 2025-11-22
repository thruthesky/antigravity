<<<<<<< HEAD
=======
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

>>>>>>> origin/firebase
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <h1 className="text-6xl font-bold tracking-tighter">
        <span className="text-red-500">헬로</span>{" "}
        <span className="text-blue-500">월드</span>
      </h1>
=======
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Firebase Auth Demo</h1>
        
        {user ? (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">Logged In</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">User ID</p>
              <p className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">{user.uid}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Email</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{user.email}</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">You are not logged in.</p>
            <Link
              href="/user/login"
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
            >
              Login
            </Link>
          </div>
        )}
      </main>
>>>>>>> origin/firebase
    </div>
  );
}
