import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-slate-400 mb-8">Page not found</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
        Go Home
      </Link>
    </div>
  )
}
