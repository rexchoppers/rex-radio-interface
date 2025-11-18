'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [hmacKey, setHmacKey] = useState('');
  const [error, setError] = useState('');

  const validateHmacKey = (key: string): boolean => {
    if (!key || key.trim().length === 0) {
      setError('HMAC Key is required');
      return false;
    }

    if (key.length < 8) {
      setError('HMAC Key must be at least 8 characters');
      return false;
    }

    setError('');
    return true;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateHmacKey(hmacKey)) {
      // Store HMAC key in localStorage for authentication
      localStorage.setItem('hmacKey', hmacKey);
      console.log('Login successful with HMAC Key:', hmacKey);
      // Navigate to dashboard
      router.push('/dashboard');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHmacKey(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <main className="w-full max-w-md px-6">
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-800">
          <h1 className="mb-6 text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Login
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                id="hmacKey"
                type="password"
                value={hmacKey}
                onChange={handleInputChange}
                className="w-full rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                placeholder="Enter your HMAC key"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-400"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
