/**
 * Site & Page Domain Types
 *
 * Uses discriminated unions via `type` prop for variants
 */

import type { ReactNode } from 'react'
import type { BrandData, PersonData, SocialData } from './startup'
import type { ActionData, FeatureItem, FeatureList, ImageData, LinkItem, LinkList, PricingTierData, PricingTierList, StatItem, StatList } from './business'
import type { AnnouncementData, FAQItem, FAQList, LogoItem, LogoList, NavItem, NavList, PostItem, PostList, TestimonialItem, TestimonialList } from './content'
import type { AppProps } from './app'

// =============================================================================
// SITE BASE
// =============================================================================

export interface SiteBase {
  name: string
  tagline?: string
  description?: string
  url?: string
  logo?: string
  icon?: string
  brand?: BrandData
  nav?: NavList
  footer?: FooterData
  social?: SocialData
  analytics?: AnalyticsData
  // Nested app support
  app?: ReactNode | AppProps
}

export interface AnalyticsData {
  google?: string
  plausible?: string
  posthog?: string
  mixpanel?: string
}

// =============================================================================
// SITE VARIANTS (Discriminated Union)
// =============================================================================

export interface LandingSite extends SiteBase {
  type: 'landing'
  hero?: HeroSection
  logos?: LogosSection
  features?: FeaturesSection
  testimonials?: TestimonialsSection
  pricing?: PricingSection
  faq?: FAQSection
  cta?: CTASection
  blog?: BlogSection
}

export interface WaitlistSite extends SiteBase {
  type: 'waitlist'
  hero?: HeroSection
  features?: FeatureList
  launchDate?: string
  showCountdown?: boolean
  newsletter?: NewsletterSection
}

export interface BlogSite extends SiteBase {
  type: 'blog'
  posts: PostList
  categories?: CategoryItem[]
  featuredPosts?: string[]
  postsPerPage?: number
  newsletter?: NewsletterSection
}

export interface DocsSite extends SiteBase {
  type: 'docs'
  sections: DocSectionItem[]
  versions?: VersionItem[]
  search?: boolean
  editUrl?: string
  toc?: boolean
}

export interface DirectorySite extends SiteBase {
  type: 'directory'
  items: DirectoryItem[]
  categories: CategoryItem[]
  filters?: FilterItem[]
  search?: boolean
  itemsPerPage?: number
}

export interface MarketplaceSite extends SiteBase {
  type: 'marketplace'
  items: MarketplaceItem[]
  categories: CategoryItem[]
  filters?: FilterItem[]
  sort?: SortItem[]
  itemsPerPage?: number
}

export interface PortfolioSite extends SiteBase {
  type: 'portfolio'
  projects: ProjectItem[]
  categories?: CategoryItem[]
  about?: AboutData
  services?: FeatureList
  contact?: ContactData
}

export interface SaaSSite extends SiteBase {
  type: 'saas'
  hero?: HeroSection
  features?: FeaturesSection
  pricing?: PricingSection
  testimonials?: TestimonialsSection
  faq?: FAQSection
  cta?: CTASection
  integrations?: IntegrationList
}

export interface AgencySite extends SiteBase {
  type: 'agency'
  hero?: HeroSection
  services?: FeatureList
  work?: ProjectItem[]
  team?: PersonData[]
  testimonials?: TestimonialsSection
  contact?: ContactData
}

// Union of all site types
export type SiteProps =
  | LandingSite
  | WaitlistSite
  | BlogSite
  | DocsSite
  | DirectorySite
  | MarketplaceSite
  | PortfolioSite
  | SaaSSite
  | AgencySite

// Extract site type literals
export type SiteType = SiteProps['type']

// =============================================================================
// PAGE BASE
// =============================================================================

export interface PageBase {
  title: string
  description?: string
  image?: string
  path?: string
}

// =============================================================================
// PAGE VARIANTS (Discriminated Union)
// =============================================================================

export interface LandingPage extends PageBase {
  type: 'landing'
  hero?: HeroSection
  logos?: LogosSection
  features?: FeaturesSection
  testimonials?: TestimonialsSection
  pricing?: PricingSection
  faq?: FAQSection
  cta?: CTASection
}

export interface AboutPage extends PageBase {
  type: 'about'
  hero?: HeroSection
  story?: ContentBlock
  mission?: ContentBlock
  values?: FeatureList
  team?: TeamSection
  stats?: StatsSection
}

export interface PricingPage extends PageBase {
  type: 'pricing'
  hero?: HeroSection
  pricing: PricingSection
  comparison?: ComparisonData
  faq?: FAQSection
  cta?: CTASection
}

export interface ContactPage extends PageBase {
  type: 'contact'
  hero?: HeroSection
  contact?: ContactData
  locations?: LocationData[]
  form?: FormData
  faq?: FAQSection
}

export interface BlogPostPage extends PageBase {
  type: 'blog-post'
  post: PostItem
  related?: PostList
  newsletter?: NewsletterSection
}

export interface BlogIndexPage extends PageBase {
  type: 'blog-index'
  posts: PostList
  categories?: CategoryItem[]
  featured?: PostList
  pagination?: PaginationData
}

export interface DocsPage extends PageBase {
  type: 'docs'
  content: string
  section?: string
  prev?: NavItem
  next?: NavItem
  toc?: TocItem[]
  editUrl?: string
}

export interface LegalPage extends PageBase {
  type: 'legal'
  content: string
  lastUpdated?: string
  toc?: TocItem[]
}

export interface ErrorPage extends PageBase {
  type: 'error'
  code?: number | string
  message?: string
  suggestions?: LinkList
}

// Union of all page types
export type PageProps =
  | LandingPage
  | AboutPage
  | PricingPage
  | ContactPage
  | BlogPostPage
  | BlogIndexPage
  | DocsPage
  | LegalPage
  | ErrorPage

// Extract page type literals
export type PageType = PageProps['type']

// =============================================================================
// SECTION BASE
// =============================================================================

export interface SectionBase {
  id?: string
  title?: string
  subtitle?: string
  description?: string
  badge?: string
}

// =============================================================================
// SECTION VARIANTS (Discriminated Union)
// =============================================================================

export interface HeroSection extends SectionBase {
  type?: 'hero'
  headline: string
  subheadline?: string
  image?: string | ImageData
  video?: string
  cta?: ActionData
  secondaryCta?: ActionData
  announcement?: AnnouncementData
  logos?: LogoList
  stats?: StatList
  variant?: 'centered' | 'split' | 'split-reverse' | 'video' | 'minimal'
  background?: 'none' | 'gradient' | 'image' | 'pattern' | 'mesh'
}

export interface FeaturesSection extends SectionBase {
  type?: 'features'
  features: FeatureList
  columns?: 2 | 3 | 4
  layout?: 'grid' | 'list' | 'alternating' | 'bento'
}

export interface PricingSection extends SectionBase {
  type?: 'pricing'
  tiers: PricingTierList
  billing?: 'monthly' | 'yearly'
  showToggle?: boolean
  faq?: FAQList
}

export interface TestimonialsSection extends SectionBase {
  type?: 'testimonials'
  testimonials: TestimonialList
  layout?: 'grid' | 'carousel' | 'single' | 'marquee'
}

export interface FAQSection extends SectionBase {
  type?: 'faq'
  faqs: FAQList
  layout?: 'accordion' | 'grid' | 'two-column'
  contact?: ActionData
}

export interface CTASection extends SectionBase {
  type?: 'cta'
  headline: string
  cta: ActionData
  secondaryCta?: ActionData
  image?: string
  variant?: 'simple' | 'split' | 'card' | 'banner' | 'full-width'
}

export interface StatsSection extends SectionBase {
  type?: 'stats'
  stats: StatList
  columns?: 2 | 3 | 4
}

export interface LogosSection extends SectionBase {
  type?: 'logos'
  logos: LogoList
  grayscale?: boolean
  layout?: 'grid' | 'marquee' | 'inline'
}

export interface TeamSection extends SectionBase {
  type?: 'team'
  members: PersonData[]
  columns?: 2 | 3 | 4
}

export interface BlogSection extends SectionBase {
  type?: 'blog'
  posts: PostList
  columns?: 2 | 3
  showMore?: ActionData
}

export interface NewsletterSection extends SectionBase {
  type?: 'newsletter'
  headline?: string
  placeholder?: string
  buttonText?: string
  onSubmit?: (email: string) => void | Promise<void>
}

export interface ComparisonSection extends SectionBase {
  type?: 'comparison'
  tiers: string[]
  features: ComparisonRow[]
}

// Union of all section types
export type SectionProps =
  | HeroSection
  | FeaturesSection
  | PricingSection
  | TestimonialsSection
  | FAQSection
  | CTASection
  | StatsSection
  | LogosSection
  | TeamSection
  | BlogSection
  | NewsletterSection
  | ComparisonSection

// =============================================================================
// SUPPORTING TYPES
// =============================================================================

export interface FooterData {
  logo?: string
  description?: string
  columns?: FooterColumnData[]
  social?: SocialData
  legal?: LinkList
  copyright?: string
}

export interface FooterColumnData {
  title: string
  links: LinkList
}

export interface HeaderData {
  logo?: string
  nav?: NavList
  cta?: ActionData
  sticky?: boolean
  transparent?: boolean
}

export interface SidebarData {
  nav?: NavList
  header?: string
  footer?: string
  width?: 'sm' | 'md' | 'lg'
  collapsible?: boolean
}

export interface ContactData {
  email?: string
  phone?: string
  address?: string
  hours?: string
  social?: SocialData
}

export interface LocationData {
  name: string
  address: string
  phone?: string
  email?: string
  hours?: string
  coordinates?: { lat: number; lng: number }
}

export interface AboutData {
  title?: string
  bio?: string
  avatar?: string
  social?: SocialData
  resume?: string
}

export interface ContentBlock {
  title?: string
  content: string
  image?: string
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
  icon?: string
  count?: number
}

export interface DirectoryItem {
  id: string
  slug: string
  name: string
  description?: string
  logo?: string
  url?: string
  category: string
  tags?: string[]
  featured?: boolean
}

export interface MarketplaceItem {
  id: string
  slug: string
  name: string
  description?: string
  logo?: string
  screenshots?: string[]
  category: string
  author?: PersonData
  pricing?: { type: 'free' | 'paid' | 'freemium'; price?: number | string }
  stats?: { downloads?: number; rating?: number; reviews?: number }
  featured?: boolean
}

export interface ProjectItem {
  id: string
  slug: string
  title: string
  description?: string
  thumbnail: string
  images?: string[]
  category?: string
  tags?: string[]
  client?: string
  date?: string
  url?: string
  featured?: boolean
}

export interface DocSectionItem {
  id: string
  slug: string
  title: string
  icon?: string
  pages: DocPageItem[]
}

export interface DocPageItem {
  id: string
  slug: string
  title: string
  description?: string
  content?: string
}

export interface VersionItem {
  version: string
  href: string
  current?: boolean
}

export interface FilterItem {
  id: string
  label: string
  type: 'select' | 'multiselect' | 'checkbox' | 'range'
  options?: { value: string; label: string }[]
}

export interface SortItem {
  value: string
  label: string
}

export interface TocItem {
  id: string
  title: string
  level: number
}

export interface PaginationData {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ComparisonData {
  tiers: string[]
  features: ComparisonRow[]
}

export interface ComparisonRow {
  name: string
  description?: string
  values: Record<string, boolean | string>
}

export interface FormData {
  fields: FormFieldData[]
  submitLabel?: string
  onSubmit?: (data: Record<string, string>) => void | Promise<void>
}

export interface FormFieldData {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

export interface IntegrationItem {
  name: string
  logo: string
  href?: string
  description?: string
}

export type IntegrationList = IntegrationItem[]
