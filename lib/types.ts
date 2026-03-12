// User & Auth
export interface User {
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
}

export interface Session {
  user?: {
    id: string
    name?: string
    email?: string
    image?: string
  }
  expires: string
}

// Projects
export interface Project {
  id: string
  userId: string
  name: string
  description?: string
  status: 'active' | 'paused' | 'planning' | 'completed' | 'awaiting'
  createdAt: Date
  updatedAt: Date
}

// Actions
export type ActionType =
  | 'campaign_create'
  | 'campaign_launch'
  | 'prospect_import'
  | 'email_send'
  | 'metrics_update'
  | 'decision_execute'

export interface Action {
  id: string
  userId: string
  projectId: string
  type: ActionType
  status: 'pending' | 'running' | 'completed' | 'failed'
  data?: any
  result?: any
  createdAt: Date
  completedAt?: Date
}

// Metrics
export interface Metric {
  id: string
  userId: string
  projectId: string
  key: string
  value: number
  createdAt: Date
}

// Decisions
export interface Decision {
  id: string
  userId: string
  projectId: string
  decision_type: string
  context?: any
  recommendation?: string
  status: 'pending' | 'approved' | 'rejected' | 'executed'
  createdAt: Date
  executedAt?: Date
}

// SYNTA-IQ Specific
export interface Campaign {
  id: string
  userId: string
  name: string
  lemlistCampaignId?: string
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed'
  prospectCount: number
  emailCount: number
  startDate?: Date
  endDate?: Date
  config?: any
  createdAt: Date
  updatedAt: Date
}

export interface Prospect {
  id: string
  userId: string
  campaignId?: string
  email: string
  firstName?: string
  lastName?: string
  fundName?: string
  location?: string
  segment?: string
  title?: string
  linkedin?: string
  status: 'new' | 'email_sent' | 'sequence_active' | 'replied' | 'cold' | 'converted'
  sentAt?: Date
  openedAt?: Date
  clickedAt?: Date
  repliedAt?: Date
  openCount: number
  clickCount: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface ProspectInteraction {
  id: string
  prospectId: string
  type: 'open' | 'click' | 'reply' | 'meeting_booked' | 'trial_signup'
  timestamp: Date
  metadata?: any
}

// API Responses
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Claude Communication (Phase 3)
export interface ClaudeRequest {
  project: string
  action: string
  data: any
  callback_url: string
}

export interface ClaudeResponse {
  success: boolean
  decision?: string
  recommendation?: string
  data?: any
  message?: string
}
