'use client';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="container mx-auto px-6 py-8">
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-800">
          <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300">
            Welcome to the Rex Radio Interface Dashboard
          </p>
        </div>
      </main>
    </div>
  );
}
