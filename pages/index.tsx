import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Home() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    // Redirect based on authentication status
    if (status === 'authenticated') {
      router.push('/dashboard')
    } else {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Show nothing while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <p className="text-slate-400">Loading...</p>
    </div>
  )
}
