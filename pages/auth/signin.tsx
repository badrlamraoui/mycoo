import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Github, Chrome, BarChart3, Zap, Target, Users } from 'lucide-react'

export default function SignIn() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  const features = [
    { icon: Target, text: 'AI-Powered Prospecting' },
    { icon: Zap, text: 'Real-Time Automation' },
    { icon: Users, text: 'Multi-Project Management' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-600/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700">
              <BarChart3 size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              MyCOO
            </h1>
          </div>
          <p className="text-slate-400 text-sm mb-2">Chief Operating Officer Agent</p>
          <p className="text-slate-500 text-xs">Manage all your strategic projects</p>
        </div>

        {/* Main Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700/50 backdrop-blur-xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => signIn('github')}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-slate-700 to-slate-700 hover:from-slate-600 hover:to-slate-600 border border-slate-600 text-white font-medium transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-slate-600/20"
            >
              <Github size={20} />
              <span>Sign in with GitHub</span>
            </button>

            <button
              onClick={() => signIn('google')}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-500 text-white font-medium transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-blue-600/30"
            >
              <Chrome size={20} />
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gradient-to-br from-slate-800/50 to-slate-800/20 text-slate-400 text-xs">
                or continue with
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center">
            No credit card required. Start managing your projects in seconds.
          </p>
        </div>

        {/* Features Section */}
        <div className="space-y-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="p-4 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-800/10 border border-slate-700/30 backdrop-blur-sm flex items-center gap-3 hover:border-blue-600/30 transition-all">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20">
                  <Icon size={16} className="text-blue-400" />
                </div>
                <span className="text-sm text-slate-300">{feature.text}</span>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8">
          By signing in, you agree to our{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
