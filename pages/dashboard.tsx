import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const projects = [
  {
    id: 'synta-iq',
    name: '@synta-iq',
    description: 'PE Fund Prospecting via Lemlist',
    status: 'active',
    statusLabel: 'Growth Phase',
    color: 'bg-blue-600',
  },
  {
    id: 'pawmedic',
    name: '@pawmedic',
    description: 'Pet Medical Intelligence',
    status: 'awaiting',
    statusLabel: 'Awaiting Brief',
    color: 'bg-slate-600',
  },
  {
    id: 'sourcia',
    name: '@sourcia',
    description: 'Data Sourcing Platform',
    status: 'awaiting',
    statusLabel: 'Awaiting Brief',
    color: 'bg-slate-600',
  },
  {
    id: 'myreply',
    name: '@myreply',
    description: 'B2B Email Prospecting',
    status: 'awaiting',
    statusLabel: 'Awaiting Brief',
    color: 'bg-slate-600',
  },
  {
    id: 'everstrong',
    name: '@everstrong',
    description: 'Strategic Intelligence',
    status: 'awaiting',
    statusLabel: 'Awaiting Brief',
    color: 'bg-slate-600',
  },
  {
    id: 'forgiapro',
    name: '@forgiapro',
    description: 'Professional Services',
    status: 'awaiting',
    statusLabel: 'Awaiting Brief',
    color: 'bg-slate-600',
  },
  {
    id: 'convex',
    name: '@convex',
    description: 'Data Analytics',
    status: 'awaiting',
    statusLabel: 'Awaiting Brief',
    color: 'bg-slate-600',
  },
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="container h-screen flex items-center justify-center">
        <p className="text-slate-300">Loading...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">MyCOO Dashboard</h1>
        <p className="text-slate-400">Manage all strategic projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer h-full">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{project.name}</h2>
                <span
                  className={`px-3 py-1 text-xs font-semibold text-white rounded ${project.color}`}
                >
                  {project.statusLabel}
                </span>
              </div>

              <p className="text-slate-400 text-sm mb-4">{project.description}</p>

              <div className="text-xs text-slate-500">
                {project.id === 'synta-iq' && (
                  <div>
                    <p>🎯 Prospecting: 146 PE funds (USA/UK/France)</p>
                    <p className="mt-2">📧 Email sequence: 4 emails ready</p>
                    <p className="mt-2">⚡ Next: Launch Lemlist campaign</p>
                  </div>
                )}
                {project.id !== 'synta-iq' && (
                  <p className="text-slate-500 italic">Add project brief to get started</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
        <h2 className="text-lg font-bold mb-3">🚀 Next Steps</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>✅ Phase 1: Foundation (Auth, Dashboard, DB) — In Progress</li>
          <li>⏳ Phase 2: SYNTA-IQ Integration (Campaigns, Prospects, Analytics)</li>
          <li>⏳ Phase 3: Intelligence Layer (Claude webhook integration)</li>
          <li>⏳ Phase 4: Scale to 6 projects</li>
        </ul>
      </div>
    </div>
  )
}
