import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { LogOut, BarChart3 } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/80 to-slate-900/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 group-hover:from-blue-500 group-hover:to-blue-600 transition-all">
            <BarChart3 size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            MyCOO
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {session?.user && (
            <>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {session.user.name || 'User'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {session.user.email}
                  </p>
                </div>
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-red-600/20 text-slate-300 hover:text-red-400 transition-all text-sm font-medium border border-slate-700/50 hover:border-red-600/50"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
