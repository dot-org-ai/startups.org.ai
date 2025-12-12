/**
 * Content Domain Types
 */

import type { PersonData, SocialData } from './startup'
import type { ActionData, ImageData, LinkItem } from './business'

// =============================================================================
// FAQ
// =============================================================================

export interface FAQItem {
  question: string
  answer: string
  category?: string
}

export type FAQList = FAQItem[]

// =============================================================================
// TESTIMONIAL
// =============================================================================

export interface TestimonialItem {
  quote: string
  author: PersonData
  company?: string
  logo?: string
  rating?: number
}

export type TestimonialList = TestimonialItem[]

// =============================================================================
// CASE STUDY
// =============================================================================

export interface CaseStudyItem {
  id: string
  title: string
  slug?: string
  description?: string
  client?: string
  logo?: string
  image?: string
  challenge?: string
  solution?: string
  results?: string[]
  testimonial?: TestimonialItem
  tags?: string[]
}

export type CaseStudyList = CaseStudyItem[]

// =============================================================================
// BLOG / POST
// =============================================================================

export interface PostItem {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  image?: string
  author?: PersonData
  date?: string
  readingTime?: number
  category?: string
  tags?: string[]
}

export type PostList = PostItem[]

// =============================================================================
// CHANGELOG
// =============================================================================

export interface ChangelogEntryItem {
  version: string
  date: string
  title?: string
  description?: string
  changes?: ChangeItem[]
}

export type ChangelogList = ChangelogEntryItem[]

export interface ChangeItem {
  type: 'feature' | 'improvement' | 'fix' | 'breaking' | 'security' | 'deprecated'
  description: string
}

// =============================================================================
// LOGO
// =============================================================================

export interface LogoItem {
  name: string
  src: string
  href?: string
}

export type LogoList = LogoItem[]

// =============================================================================
// NAVIGATION
// =============================================================================

export interface NavItem {
  label: string
  href?: string
  icon?: string
  badge?: string | number
  children?: NavItem[]
  external?: boolean
}

export type NavList = NavItem[]

// =============================================================================
// BREADCRUMB
// =============================================================================

export interface BreadcrumbItem {
  label: string
  href?: string
}

export type BreadcrumbList = BreadcrumbItem[]

// =============================================================================
// TAB
// =============================================================================

export interface TabItem {
  id: string
  label: string
  icon?: string
  badge?: string | number
  disabled?: boolean
}

export type TabList = TabItem[]

// =============================================================================
// STEP
// =============================================================================

export interface StepItem {
  id?: string
  title: string
  description?: string
  icon?: string
  status?: 'pending' | 'current' | 'completed' | 'error'
}

export type StepList = StepItem[]

// =============================================================================
// TIMELINE
// =============================================================================

export interface TimelineEventItem {
  id?: string
  title: string
  description?: string
  date?: string
  icon?: string
  status?: 'past' | 'current' | 'future'
}

export type TimelineList = TimelineEventItem[]

// =============================================================================
// NOTIFICATION
// =============================================================================

export interface NotificationItem {
  id: string
  title: string
  description?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  read?: boolean
  date?: string
  action?: ActionData
}

export type NotificationList = NotificationItem[]

// =============================================================================
// ANNOUNCEMENT
// =============================================================================

export interface AnnouncementData {
  id?: string
  text: string
  href?: string
  badge?: string
  dismissible?: boolean
}

// =============================================================================
// MEDIA
// =============================================================================

export interface VideoData {
  src: string
  poster?: string
  title?: string
  duration?: number
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export interface EmbedData {
  type: 'youtube' | 'vimeo' | 'twitter' | 'iframe'
  url: string
  title?: string
}
