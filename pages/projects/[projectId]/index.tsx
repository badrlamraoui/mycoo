import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'

const projectContent: Record<string, any> = {
  'synta-iq': {
    name: '@synta-iq',
    description: 'French Company Data Intelligence for PE Fund Diligence',
    status: 'active',
    sections: [
      {
        title: 'Overview',
        content: 'PE Fund prospecting campaign targeting USA/UK and France-based PE funds with significant French deal activity. Using Lemlist for email automation.',
      },
      {
        title: 'Current Initiative',
        content: 'Lemlist campaign with 146 PE prospects and 4-email sequence validated and ready for launch.',
      },
      {
        title: 'Prospects',
        content: '146 total PE fund executives across 100 USA/UK funds and 46 France-based PE firms (Ardian, PAI, Astorg, etc.)',
      },
      {
        title: 'Metrics',
        content: 'Open rate: 40%+, Click rate: 12%+, Reply rate: 4%+, Meeting bookings: 20-30% of replies, Trial signups: 15%+ overall',
      },
    ],
    nextSteps: [
      'Build & test Lemlist API script (this week)',
      'Run campaign with 10 test prospects',
      'Monitor first 48 hours',
      'Launch full campaign if all good',
      'Daily monitoring for 2 weeks',
    ],
  },
}

export default function ProjectDetail() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { projectId } = router.query

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading' || !projectId) {
    return (
      <div className="container h-screen flex items-center justify-center">
        <p className="text-slate-300">Loading...</p>
      </div>
    )
  }

  const project = projectContent[projectId as string]

  if (!project) {
    return (
      <div className="container py-12">
        <div className="mb-8">
          <Link href="/dashboard" className="text-accent hover:text-blue-400">
            ← Back to Dashboard
          </Link>
        </div>
        <div className="p-6 bg-secondary rounded-lg border border-slate-700">
          <h1 className="text-2xl font-bold text-white">Project Brief Template</h1>
          <p className="text-slate-400 mt-4">This project awaits a brief. Add project details to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/dashboard" className="text-accent hover:text-blue-400">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">{project.name}</h1>
        <p className="text-slate-400 mt-2">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-secondary rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 uppercase">Status</h3>
          <p className="text-2xl font-bold text-accent mt-2">{project.status}</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {project.sections.map((section: any, idx: number) => (
          <div key={idx} className="p-6 bg-secondary rounded-lg border border-slate-700">
            <h2 className="text-xl font-bold mb-3">{section.title}</h2>
            <p className="text-slate-300">{section.content}</p>
          </div>
        ))}
      </div>

      {project.nextSteps && (
        <div className="p-6 bg-secondary rounded-lg border border-slate-700">
          <h2 className="text-xl font-bold mb-4">Next Steps</h2>
          <ol className="space-y-2 text-slate-300">
            {project.nextSteps.map((step: string, idx: number) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-accent">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {projectId === 'synta-iq' && (
        <div className="mt-8 p-6 bg-blue-900 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold mb-3">🚀 Phase 2 Tasks</h3>
          <p className="text-sm text-slate-300 mb-4">These will be built in Phase 2:</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>✅ Campaign Manager (CRUD campaigns)</li>
            <li>✅ Prospect Table (import CSV, view status)</li>
            <li>✅ Analytics Dashboard (opens, clicks, replies)</li>
            <li>✅ Lemlist Integration (API for launch)</li>
          </ul>
        </div>
      )}
    </div>
  )
}
