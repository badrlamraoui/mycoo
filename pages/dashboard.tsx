import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  Zap, Target, Users, TrendingUp, Briefcase,
  Database, Cpu, BarChart3, ArrowRight, CheckCircle2,
  Clock, Rocket
} from 'lucide-react'

const projects = [
  {
    id: 'synta-iq',
    name: '@synta-iq',
    description: 'PE Fund Prospecting Intelligence',
    icon: Target,
    gradient: 'from-blue-600 to-cyan-600',
    status: 'active',
    statusLabel: 'Active',
    stats: {
      prospects: '146',
      campaigns: '1',
      openRate: '40%+'
    },
    badge: '🎯'
  },
  {
    id: 'pawmedic',
    name: '@pawmedic',
    description: 'Pet Medical Intelligence Platform',
    icon: Users,
    gradient: 'from-purple-600 to-pink-600',
    status: 'planning',
    statusLabel: 'Planning',
    stats: {
      feature: 'Medical AI',
      stage: 'Design',
    },
    badge: '🐾'
  },
  {
    id: 'sourcia',
    name: '@sourcia',
    description: 'Data Sourcing & Enrichment',
    icon: Database,
    gradient: 'from-orange-600 to-red-600',
    status: 'planning',
    statusLabel: 'Planning',
    stats: {
      feature: 'Data Pipeline',
      stage: 'Planning',
    },
    badge: '📊'
  },
  {
    id: 'myreply',
    name: '@myreply',
    description: 'B2B Email Prospecting Suite',
    icon: Zap,
    gradient: 'from-green-600 to-emerald-600',
    status: 'planning',
    statusLabel: 'Planning',
    stats: {
      feature: 'Email Automation',
      stage: 'Design',
    },
    badge: '⚡'
  },
  {
    id: 'everstrong',
    name: '@everstrong',
    description: 'Strategic Intelligence Engine',
    icon: Cpu,
    gradient: 'from-indigo-600 to-blue-600',
    status: 'planning',
    statusLabel: 'Planning',
    stats: {
      feature: 'AI Engine',
      stage: 'Planning',
    },
    badge: '🧠'
  },
  {
    id: 'forgiapro',
    name: '@forgiapro',
    description: 'Professional Services Platform',
    icon: Briefcase,
    gradient: 'from-amber-600 to-orange-600',
    status: 'planning',
    statusLabel: 'Planning',
    stats: {
      feature: 'Services Hub',
      stage: 'Design',
    },
    badge: '💼'
  },
  {
    id: 'convex',
    name: '@convex',
    description: 'Data Analytics & Visualization',
    icon: BarChart3,
    gradient: 'from-rose-600 to-pink-600',
    status: 'planning',
    statusLabel: 'Planning',
    stats: {
      feature: 'Analytics Dashboard',
      stage: 'Planning',
    },
    badge: '📈'
  },
]

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: '✓ Complete',
    items: ['Auth System', 'Dashboard', 'Database Schema'],
    icon: CheckCircle2,
    color: 'from-green-600 to-emerald-600'
  },
  {
    phase: 'Phase 2',
    title: 'SYNTA-IQ Integration',
    status: 'In Progress',
    items: ['Campaigns', 'Prospects', 'Analytics'],
    icon: Clock,
    color: 'from-blue-600 to-cyan-600'
  },
  {
    phase: 'Phase 3',
    title: 'Intelligence Layer',
    status: 'Coming Soon',
    items: ['Claude Webhooks', 'Auto-Decisions', 'AI Suggestions'],
    icon: Cpu,
    color: 'from-purple-600 to-pink-600'
  },
  {
    phase: 'Phase 4',
    title: 'Scale Projects',
    status: 'Planned',
    items: ['6 New Projects', 'Cross-Project Sync', 'Analytics'],
    icon: Rocket,
    color: 'from-orange-600 to-red-600'
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
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 mx-auto mb-4 animate-pulse"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">MyCOO</span>
          </h1>
          <p className="text-lg text-slate-400 mb-2">Chief Operating Officer Agent</p>
          <p className="text-slate-500">Manage all your strategic projects from one powerful dashboard</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/50 transition-all">
            <p className="text-sm text-slate-400 mb-2">Active Projects</p>
            <p className="text-3xl font-bold text-white">1</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/50 transition-all">
            <p className="text-sm text-slate-400 mb-2">Planned Projects</p>
            <p className="text-3xl font-bold text-white">6</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/50 transition-all">
            <p className="text-sm text-slate-400 mb-2">Total Prospects</p>
            <p className="text-3xl font-bold text-white">146</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/50 transition-all">
            <p className="text-sm text-slate-400 mb-2">Completion</p>
            <p className="text-3xl font-bold text-white">25%</p>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Strategic Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="group h-full p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} group-hover:shadow-lg transition-all`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <span className="text-2xl">{project.badge}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{project.description}</p>

                  {project.status === 'active' && (
                    <div className="space-y-2 mb-4 pb-4 border-b border-slate-700/50">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Prospects</span>
                        <span className="text-blue-400 font-semibold">{project.stats.prospects}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Open Rate</span>
                        <span className="text-green-400 font-semibold">{project.stats.openRate}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      project.status === 'active'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-slate-700/50 text-slate-300'
                    }`}>
                      {project.statusLabel}
                    </span>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Development Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapPhases.map((roadmap, idx) => {
            const Icon = roadmap.icon
            return (
              <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${roadmap.color} mb-4 w-fit`}>
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-xs font-semibold text-slate-400 mb-1">{roadmap.phase}</p>
                <h3 className="text-lg font-bold text-white mb-1">{roadmap.title}</h3>
                <p className={`text-xs font-medium mb-4 ${
                  roadmap.status === '✓ Complete' ? 'text-green-400' :
                  roadmap.status === 'In Progress' ? 'text-blue-400' :
                  'text-slate-400'
                }`}>
                  {roadmap.status}
                </p>
                <ul className="space-y-2">
                  {roadmap.items.map((item, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-600/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Rocket size={24} className="text-blue-400" />
            <h3 className="text-xl font-bold text-white">Ready to Get Started?</h3>
          </div>
          <p className="text-slate-300 mb-6">Explore @synta-iq to start managing your PE fund prospecting campaign with 146 qualified targets and a proven 4-email sequence.</p>
          <Link href="/projects/synta-iq" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-600/50 transition-all">
            View SYNTA-IQ
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
