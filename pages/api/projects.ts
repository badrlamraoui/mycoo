import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getUserProjects, createProject } from '@/lib/db'
import type { ApiResponse, Project } from '@/lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Project | Project[]>>
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.id) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    })
  }

  try {
    if (req.method === 'GET') {
      const projects = await getUserProjects(session.user.id)
      return res.status(200).json({
        success: true,
        data: projects,
      })
    }

    if (req.method === 'POST') {
      const { id, name, description, status } = req.body

      if (!id || !name) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: id, name',
        })
      }

      const project = await createProject(session.user.id, {
        id,
        name,
        description,
        status,
      })

      return res.status(201).json({
        success: true,
        data: project,
      })
    }

    res.status(405).json({
      success: false,
      error: 'Method not allowed',
    })
  } catch (error) {
    console.error('Projects API error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
}
