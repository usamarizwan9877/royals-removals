import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory-50 px-6 text-center">
      <div>
        <p className="eyebrow justify-center">404</p>
        <h1 className="h-section mt-4">Page not found</h1>
        <Link href="/" className="btn-ink mt-8">Home</Link>
      </div>
    </main>
  );
}
