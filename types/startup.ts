/**
 * Startup Domain Types
 */

// =============================================================================
// STARTUP
// =============================================================================

export interface StartupData {
  id: string
  slug: string
  name: string
  tagline?: string
  description?: string
  logo?: string
  domain?: string
  status?: 'idea' | 'validating' | 'building' | 'launched' | 'scaling' | 'paused' | 'dead'
  stage?: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'growth' | 'public'
  founded?: string
  website?: string
  industry?: string
  tags?: string[]
}

export type StartupList = StartupData[]

// =============================================================================
// BRAND
// =============================================================================

export interface BrandData {
  name: string
  tagline?: string
  logo?: string
  icon?: string
  colors?: {
    primary?: string
    secondary?: string
    accent?: string
  }
  fonts?: {
    heading?: string
    body?: string
  }
}

// =============================================================================
// TEAM
// =============================================================================

export interface PersonData {
  id?: string
  name: string
  role?: string
  title?: string
  avatar?: string
  bio?: string
  email?: string
  social?: SocialData
}

export type TeamList = PersonData[]

export interface SocialData {
  twitter?: string
  linkedin?: string
  github?: string
  website?: string
}

// =============================================================================
// HYPOTHESIS
// =============================================================================

export interface HypothesisData {
  id: string
  name: string
  thesis: string
  description?: string
  status?: 'draft' | 'active' | 'validated' | 'invalidated' | 'paused'
}

export type HypothesisList = HypothesisData[]

// =============================================================================
// EXPERIMENT
// =============================================================================

export interface ExperimentData {
  id: string
  name: string
  description?: string
  hypothesis?: string
  status?: 'planned' | 'running' | 'completed' | 'paused'
  channel?: string
  metrics?: MetricData[]
  startDate?: string
  endDate?: string
}

export type ExperimentList = ExperimentData[]

export interface MetricData {
  name: string
  value: number | string
  unit?: string
  change?: number
  trend?: 'up' | 'down' | 'flat'
}

export type MetricList = MetricData[]

// =============================================================================
// VIABILITY
// =============================================================================

export interface ScoreData {
  value: number
  max?: number
  label?: string
}

export interface ViabilityData {
  overall: number
  market?: number
  problem?: number
  solution?: number
  competition?: number
  timing?: number
  team?: number
}
