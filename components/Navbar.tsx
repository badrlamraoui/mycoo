import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <nav className="fixed top-0 w-full bg-slate-800 border-b border-slate-700 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/dashboard" className="text-xl font-bold text-blue-500 hover:text-blue-400">
          MyCOO
        </Link>

        <div className="flex items-center gap-4">
          {session?.user && (
            <>
              <span className="text-sm text-slate-300">
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded transition-colors"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
