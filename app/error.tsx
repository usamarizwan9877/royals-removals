"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory-50 px-6 text-center">
      <div>
        <h1 className="h-section">Something went wrong</h1>
        <button onClick={reset} className="btn-ink mt-8">Try again</button>
      </div>
    </main>
  );
}
