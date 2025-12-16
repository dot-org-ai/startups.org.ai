/**
 * Site Schema
 *
 * Defines the structure for different types of sites that startups might need:
 * - Landing pages for customer acquisition
 * - Documentation sites for developer/user education
 * - Blogs for content marketing
 * - Marketing sites for brand presence
 * - Customer portals for service delivery
 * - Dashboards for data visualization
 *
 * Each site type has specific requirements for navigation, SEO, analytics,
 * and content management that can be generated and configured.
 */

import { z } from 'zod'

// =============================================================================
// SITE TYPE & PURPOSE
// =============================================================================

export const SiteType = z.enum([
  'landing',      // Single-page or multi-page landing site for conversions
  'docs',         // Documentation site for technical content
  'blog',         // Blog/content marketing site
  'marketing',    // Full marketing website with multiple sections
  'portal',       // Customer/user portal for authenticated users
  'dashboard',    // Data dashboard with visualizations
]).describe('Type of site being built - determines structure and features')
export type SiteType = z.infer<typeof SiteType>

export const SitePurpose = z.object({
  type: SiteType,
  primaryGoal: z.enum([
    'lead-generation',      // Capture leads via forms
    'direct-sales',         // Direct product sales/sign-ups
    'education',            // Educate users on product/service
    'engagement',           // Increase user engagement/retention
    'support',              // Provide customer support/documentation
    'brand-awareness',      // Build brand presence and awareness
  ]).describe('Primary business goal this site serves'),
  secondaryGoals: z.array(z.string()).describe('Additional goals or objectives'),
  targetAudience: z.string().describe('Primary audience for this site'),
  successMetrics: z.array(z.string()).describe('Key metrics to measure site success'),
})
export type SitePurpose = z.infer<typeof SitePurpose>

// =============================================================================
// PAGE DEFINITION
// =============================================================================

export const PageTemplate = z.enum([
  // Landing page templates
  'hero-cta',             // Simple hero with CTA
  'feature-showcase',     // Feature-focused layout
  'pricing-page',         // Pricing table layout
  'comparison',           // Competitor comparison
  'use-case',             // Use case / case study layout

  // Documentation templates
  'doc-article',          // Standard documentation article
  'api-reference',        // API reference documentation
  'tutorial',             // Step-by-step tutorial
  'guide',                // Comprehensive guide

  // Blog templates
  'blog-post',            // Standard blog post
  'blog-index',           // Blog listing/archive
  'author-page',          // Author profile

  // Marketing templates
  'about',                // About page
  'contact',              // Contact page
  'team',                 // Team page
  'careers',              // Careers/jobs page

  // Portal templates
  'dashboard-home',       // Portal dashboard home
  'settings',             // User settings page
  'account',              // Account management

  // Dashboard templates
  'analytics',            // Analytics dashboard
  'reports',              // Reports page
  'data-viz',             // Data visualization page
]).describe('Template type that defines page layout and structure')
export type PageTemplate = z.infer<typeof PageTemplate>

export const PageMeta = z.object({
  title: z.string().max(60).describe('Page title (max 60 chars for SEO)'),
  description: z.string().max(160).describe('Meta description (max 160 chars for SEO)'),
  keywords: z.array(z.string()).optional().describe('Meta keywords (legacy but sometimes useful)'),
  ogImage: z.string().optional().describe('Open Graph image URL for social sharing'),
  canonicalUrl: z.string().optional().describe('Canonical URL to avoid duplicate content issues'),
  noindex: z.boolean().default(false).describe('Whether to exclude from search engine indexing'),
  nofollow: z.boolean().default(false).describe('Whether to prevent search engines from following links'),
})
export type PageMeta = z.infer<typeof PageMeta>

export const PageSection = z.object({
  id: z.string().describe('Unique section identifier within the page'),
  type: z.string().describe('Section type (hero, features, testimonials, etc.)'),
  heading: z.string().optional().describe('Section heading'),
  content: z.string().optional().describe('Section content (markdown supported)'),
  props: z.record(z.unknown()).optional().describe('Additional section-specific properties'),
  order: z.number().describe('Display order of this section on the page'),
})
export type PageSection = z.infer<typeof PageSection>

export const Page = z.object({
  // Identity
  id: z.string().describe('Unique page identifier (kebab-case)'),
  path: z.string().describe('URL path for this page (e.g., "/pricing", "/docs/getting-started")'),
  slug: z.string().describe('URL-friendly slug used in the path'),

  // Content
  title: z.string().describe('Page display title'),
  subtitle: z.string().optional().describe('Page subtitle or description'),
  template: PageTemplate.describe('Template to use for rendering this page'),
  sections: z.array(PageSection).describe('Content sections that make up this page'),

  // Metadata
  meta: PageMeta.describe('SEO and metadata configuration'),

  // Navigation
  showInNav: z.boolean().default(true).describe('Whether page appears in main navigation'),
  navLabel: z.string().optional().describe('Label to use in navigation (defaults to title)'),
  navOrder: z.number().optional().describe('Order in navigation menu'),
  parentPageId: z.string().optional().describe('Parent page ID for hierarchical navigation'),

  // Access control
  requiresAuth: z.boolean().default(false).describe('Whether page requires authentication'),
  allowedRoles: z.array(z.string()).optional().describe('User roles allowed to access this page'),

  // Publishing
  status: z.enum(['draft', 'published', 'archived']).describe('Publication status'),
  publishedAt: z.string().datetime().optional().describe('When page was published'),
  updatedAt: z.string().datetime().describe('Last update timestamp'),
})
export type Page = z.infer<typeof Page>

// =============================================================================
// NAVIGATION
// =============================================================================

export const NavItemType = z.enum([
  'link',         // Simple link
  'dropdown',     // Dropdown with children
  'mega-menu',    // Large menu with multiple columns
  'button',       // CTA button
  'divider',      // Visual separator
]).describe('Type of navigation item')
export type NavItemType = z.infer<typeof NavItemType>

// Base NavItem type for recursive definition
type NavItemBase = {
  id: string
  type: NavItemType
  label: string
  href?: string
  icon?: string
  description?: string
  children?: NavItemBase[]
  variant?: 'default' | 'primary' | 'ghost' | 'outline'
  badge?: string
  openInNewTab: boolean
  order: number
  requiresAuth: boolean
  hideOnMobile: boolean
}

// NavItem schema with recursive children
const BaseNavItemSchema = z.object({
  id: z.string().describe('Unique navigation item identifier'),
  type: NavItemType,
  label: z.string().describe('Text label for the navigation item'),
  href: z.string().optional().describe('Link destination (URL or path)'),
  icon: z.string().optional().describe('Icon name or identifier'),
  description: z.string().optional().describe('Description for mega-menu items'),
  variant: z.enum(['default', 'primary', 'ghost', 'outline']).optional().describe('Visual variant'),
  badge: z.string().optional().describe('Badge text (e.g., "New", "Beta")'),
  openInNewTab: z.boolean().default(false).describe('Whether link opens in new tab'),
  order: z.number().describe('Display order within parent'),
  requiresAuth: z.boolean().default(false).describe('Show only to authenticated users'),
  hideOnMobile: z.boolean().default(false).describe('Hide this item on mobile devices'),
})

export const NavItem: z.ZodType<NavItemBase> = BaseNavItemSchema.extend({
  children: z.lazy(() => z.array(NavItem)).optional().describe('Child navigation items for dropdowns'),
}) as z.ZodType<NavItemBase>

export type NavItem = NavItemBase

export const NavigationMenu = z.object({
  id: z.string().describe('Unique menu identifier'),
  name: z.string().describe('Menu name (e.g., "Main Nav", "Footer Nav")'),
  location: z.enum([
    'header',       // Main header navigation
    'footer',       // Footer navigation
    'sidebar',      // Sidebar navigation
    'mobile',       // Mobile-specific navigation
  ]).describe('Where this menu appears on the site'),
  items: z.array(NavItem).describe('Navigation items in this menu'),
  style: z.object({
    layout: z.enum(['horizontal', 'vertical', 'grid']).describe('Menu layout style'),
    sticky: z.boolean().default(false).describe('Whether menu sticks on scroll'),
    transparent: z.boolean().default(false).describe('Whether background is transparent'),
  }).optional().describe('Menu styling configuration'),
})
export type NavigationMenu = z.infer<typeof NavigationMenu>

export const Breadcrumb = z.object({
  enabled: z.boolean().describe('Whether breadcrumbs are enabled'),
  showOnPages: z.array(z.string()).optional().describe('Page IDs to show breadcrumbs on (empty = all)'),
  separator: z.string().default('/').describe('Separator character between breadcrumb items'),
  showHome: z.boolean().default(true).describe('Whether to show home link in breadcrumbs'),
})
export type Breadcrumb = z.infer<typeof Breadcrumb>

export const Navigation = z.object({
  menus: z.array(NavigationMenu).describe('All navigation menus for the site'),
  breadcrumbs: Breadcrumb.describe('Breadcrumb navigation configuration'),
  mobileBreakpoint: z.number().default(768).describe('Pixel width for mobile menu breakpoint'),
})
export type Navigation = z.infer<typeof Navigation>

// =============================================================================
// SEO CONFIGURATION
// =============================================================================

export const OpenGraphConfig = z.object({
  siteName: z.string().describe('Site name for Open Graph'),
  type: z.enum(['website', 'article', 'product', 'profile']).describe('Open Graph type'),
  locale: z.string().default('en_US').describe('Content locale'),
  defaultImage: z.string().describe('Default OG image URL when page doesn\'t specify one'),
  twitterCard: z.enum(['summary', 'summary_large_image', 'app', 'player']).describe('Twitter card type'),
  twitterSite: z.string().optional().describe('Twitter handle for site (@username)'),
  twitterCreator: z.string().optional().describe('Twitter handle for content creator (@username)'),
})
export type OpenGraphConfig = z.infer<typeof OpenGraphConfig>

export const StructuredDataType = z.enum([
  'Organization',        // Company/organization info
  'WebSite',            // Website info with search action
  'Article',            // Blog post or article
  'Product',            // Product listing
  'SoftwareApplication',// Software product
  'FAQPage',            // FAQ page
  'BreadcrumbList',     // Breadcrumb navigation
  'HowTo',              // Tutorial/how-to guide
]).describe('Schema.org structured data type')
export type StructuredDataType = z.infer<typeof StructuredDataType>

export const StructuredData = z.object({
  type: StructuredDataType,
  data: z.record(z.unknown()).describe('Schema.org structured data object'),
  pageIds: z.array(z.string()).optional().describe('Specific pages to include this data on (empty = all)'),
})
export type StructuredData = z.infer<typeof StructuredData>

export const SitemapConfig = z.object({
  enabled: z.boolean().describe('Whether to generate sitemap'),
  excludePaths: z.array(z.string()).describe('Paths to exclude from sitemap (glob patterns supported)'),
  changefreq: z.enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).describe('Default change frequency'),
  priority: z.number().min(0).max(1).default(0.5).describe('Default priority (0.0 to 1.0)'),
  includeImages: z.boolean().default(true).describe('Whether to include images in sitemap'),
})
export type SitemapConfig = z.infer<typeof SitemapConfig>

export const RobotsConfig = z.object({
  enabled: z.boolean().describe('Whether to generate robots.txt'),
  rules: z.array(z.object({
    userAgent: z.string().describe('User agent this rule applies to (* for all)'),
    allow: z.array(z.string()).describe('Paths to allow'),
    disallow: z.array(z.string()).describe('Paths to disallow'),
  })).describe('Robots.txt rules'),
  sitemapUrl: z.string().optional().describe('URL to sitemap file'),
  crawlDelay: z.number().optional().describe('Crawl delay in seconds'),
})
export type RobotsConfig = z.infer<typeof RobotsConfig>

export const SEOConfig = z.object({
  // Site-wide defaults
  defaultTitle: z.string().describe('Default title for pages without specific title'),
  titleTemplate: z.string().default('%s | Site Name').describe('Template for page titles (%s = page title)'),
  defaultDescription: z.string().describe('Default meta description'),
  defaultKeywords: z.array(z.string()).optional().describe('Default keywords for all pages'),

  // Open Graph & Social
  openGraph: OpenGraphConfig.describe('Open Graph configuration for social sharing'),

  // Structured Data
  structuredData: z.array(StructuredData).describe('Schema.org structured data for rich results'),

  // Sitemap & Robots
  sitemap: SitemapConfig.describe('Sitemap generation configuration'),
  robots: RobotsConfig.describe('Robots.txt configuration'),

  // Verification
  verificationTokens: z.object({
    google: z.string().optional().describe('Google Search Console verification token'),
    bing: z.string().optional().describe('Bing Webmaster Tools verification token'),
    yandex: z.string().optional().describe('Yandex Webmaster verification token'),
  }).optional().describe('Search engine verification tokens'),
})
export type SEOConfig = z.infer<typeof SEOConfig>

// =============================================================================
// ANALYTICS
// =============================================================================

export const TrackingPixel = z.object({
  id: z.string().describe('Pixel identifier'),
  provider: z.enum([
    'google-analytics',
    'google-tag-manager',
    'facebook-pixel',
    'linkedin-insight',
    'twitter-pixel',
    'tiktok-pixel',
    'reddit-pixel',
    'custom',
  ]).describe('Analytics provider'),
  trackingId: z.string().describe('Tracking/pixel ID'),
  enabled: z.boolean().default(true).describe('Whether tracking is enabled'),
  scriptUrl: z.string().optional().describe('Custom script URL if provider is "custom"'),
})
export type TrackingPixel = z.infer<typeof TrackingPixel>

export const AnalyticsEvent = z.object({
  name: z.string().describe('Event name'),
  category: z.string().optional().describe('Event category'),
  action: z.string().describe('Event action'),
  label: z.string().optional().describe('Event label'),
  value: z.number().optional().describe('Event value'),
  trigger: z.enum([
    'pageview',       // Fires on page view
    'click',          // Fires on element click
    'submit',         // Fires on form submit
    'scroll',         // Fires on scroll depth
    'time',           // Fires after time on page
    'custom',         // Custom trigger
  ]).describe('When this event should fire'),
  selector: z.string().optional().describe('CSS selector for element-based triggers'),
  metadata: z.record(z.unknown()).optional().describe('Additional event metadata'),
})
export type AnalyticsEvent = z.infer<typeof AnalyticsEvent>

export const ConversionGoal = z.object({
  id: z.string().describe('Goal identifier'),
  name: z.string().describe('Human-readable goal name'),
  type: z.enum([
    'page-visit',     // User visits specific page
    'form-submit',    // User submits form
    'button-click',   // User clicks specific button
    'time-on-site',   // User spends X time on site
    'scroll-depth',   // User scrolls X% of page
    'video-play',     // User plays video
    'download',       // User downloads file
    'custom',         // Custom goal
  ]).describe('Type of conversion goal'),
  value: z.number().optional().describe('Monetary value of this conversion'),
  trigger: z.object({
    pageId: z.string().optional().describe('Page ID for page-visit goals'),
    selector: z.string().optional().describe('CSS selector for element-based goals'),
    threshold: z.number().optional().describe('Threshold for time/scroll goals'),
  }).optional().describe('Goal trigger configuration'),
})
export type ConversionGoal = z.infer<typeof ConversionGoal>

export const AnalyticsConfig = z.object({
  // Tracking pixels
  pixels: z.array(TrackingPixel).describe('Tracking pixels and analytics providers'),

  // Events
  events: z.array(AnalyticsEvent).describe('Custom analytics events to track'),

  // Goals
  goals: z.array(ConversionGoal).describe('Conversion goals to measure'),

  // Privacy
  cookieConsent: z.object({
    enabled: z.boolean().describe('Whether to show cookie consent banner'),
    strictMode: z.boolean().describe('Whether to block tracking before consent'),
    customizableCategories: z.boolean().describe('Allow users to customize cookie categories'),
  }).describe('Cookie consent configuration'),

  // Advanced
  enableHeatmaps: z.boolean().default(false).describe('Enable heatmap tracking (e.g., Hotjar)'),
  enableSessionRecording: z.boolean().default(false).describe('Enable session recording'),
  enableABTesting: z.boolean().default(false).describe('Enable A/B testing framework'),
})
export type AnalyticsConfig = z.infer<typeof AnalyticsConfig>

// =============================================================================
// CMS CONFIGURATION
// =============================================================================

export const CMSProvider = z.enum([
  'none',             // No CMS, static content
  'contentful',       // Contentful CMS
  'sanity',           // Sanity.io
  'strapi',           // Strapi
  'wordpress',        // WordPress (headless)
  'ghost',            // Ghost (headless)
  'prismic',          // Prismic
  'contentstack',     // Contentstack
  'notion',           // Notion as CMS
  'airtable',         // Airtable as CMS
  'markdown',         // Markdown files (git-based)
  'mdx',              // MDX files (git-based)
  'custom',           // Custom CMS integration
]).describe('Content management system provider')
export type CMSProvider = z.infer<typeof CMSProvider>

export const ContentModel = z.object({
  id: z.string().describe('Content model identifier'),
  name: z.string().describe('Human-readable content model name'),
  fields: z.array(z.object({
    name: z.string().describe('Field name'),
    type: z.enum([
      'text',
      'rich-text',
      'markdown',
      'number',
      'boolean',
      'date',
      'media',
      'reference',
      'array',
    ]).describe('Field type'),
    required: z.boolean().describe('Whether field is required'),
    description: z.string().optional().describe('Field description for editors'),
  })).describe('Content model fields'),
  description: z.string().optional().describe('Content model description'),
})
export type ContentModel = z.infer<typeof ContentModel>

export const CMSWebhook = z.object({
  event: z.enum([
    'content.create',
    'content.update',
    'content.delete',
    'content.publish',
    'content.unpublish',
  ]).describe('CMS event that triggers webhook'),
  url: z.string().describe('Webhook endpoint URL'),
  secret: z.string().optional().describe('Webhook secret for verification'),
})
export type CMSWebhook = z.infer<typeof CMSWebhook>

export const CMSConfig = z.object({
  // Provider
  provider: CMSProvider.describe('Content management system provider'),

  // Connection
  apiEndpoint: z.string().optional().describe('CMS API endpoint URL'),
  apiKey: z.string().optional().describe('CMS API key (should be in env var in production)'),
  spaceId: z.string().optional().describe('CMS space/project ID'),

  // Content
  contentModels: z.array(ContentModel).describe('Content models/types available in CMS'),

  // Preview
  previewMode: z.object({
    enabled: z.boolean().describe('Enable preview mode for draft content'),
    secret: z.string().optional().describe('Preview mode secret token'),
  }).optional().describe('Preview mode configuration for viewing unpublished content'),

  // Webhooks
  webhooks: z.array(CMSWebhook).optional().describe('Webhook configuration for content updates'),

  // Sync
  syncConfig: z.object({
    enabled: z.boolean().describe('Enable automatic content synchronization'),
    interval: z.number().optional().describe('Sync interval in minutes'),
    revalidation: z.enum(['on-demand', 'interval', 'webhook']).describe('Content revalidation strategy'),
  }).optional().describe('Content synchronization configuration'),
})
export type CMSConfig = z.infer<typeof CMSConfig>

// =============================================================================
// SITE CONFIGURATION (Main Schema)
// =============================================================================

export const SiteTheme = z.object({
  colors: z.object({
    primary: z.string().describe('Primary brand color (hex)'),
    secondary: z.string().describe('Secondary brand color (hex)'),
    accent: z.string().describe('Accent color (hex)'),
    background: z.string().describe('Background color (hex)'),
    foreground: z.string().describe('Foreground/text color (hex)'),
  }).describe('Color palette for the site'),
  typography: z.object({
    headingFont: z.string().describe('Font family for headings'),
    bodyFont: z.string().describe('Font family for body text'),
    monoFont: z.string().describe('Font family for code/monospace'),
  }).describe('Typography configuration'),
  borderRadius: z.number().default(8).describe('Default border radius in pixels'),
  spacing: z.enum(['compact', 'default', 'comfortable']).default('default').describe('Spacing scale'),
})
export type SiteTheme = z.infer<typeof SiteTheme>

export const SiteConfig = z.object({
  // Identity
  id: z.string().describe('Unique site identifier (kebab-case)'),
  name: z.string().describe('Site name'),
  domain: z.string().describe('Primary domain for this site'),

  // Purpose & Type
  purpose: SitePurpose.describe('Site purpose and business goals'),

  // Content
  pages: z.array(Page).describe('All pages that make up this site'),
  homepage: z.string().describe('Page ID to use as homepage'),

  // Navigation
  navigation: Navigation.describe('Site navigation configuration'),

  // SEO
  seo: SEOConfig.describe('SEO and search engine optimization configuration'),

  // Analytics
  analytics: AnalyticsConfig.describe('Analytics and tracking configuration'),

  // CMS
  cms: CMSConfig.describe('Content management system configuration'),

  // Design
  theme: SiteTheme.describe('Visual theme and design system'),

  // Features
  features: z.object({
    search: z.boolean().default(false).describe('Enable site-wide search'),
    i18n: z.boolean().default(false).describe('Enable internationalization'),
    darkMode: z.boolean().default(false).describe('Enable dark mode toggle'),
    printOptimized: z.boolean().default(false).describe('Include print-optimized styles'),
  }).describe('Optional site features'),

  // Deployment
  deployment: z.object({
    platform: z.enum([
      'vercel',
      'netlify',
      'aws',
      'cloudflare',
      'self-hosted',
      'other',
    ]).optional().describe('Deployment platform'),
    branch: z.string().default('main').describe('Git branch for deployment'),
    buildCommand: z.string().optional().describe('Custom build command'),
    outputDirectory: z.string().optional().describe('Build output directory'),
  }).optional().describe('Deployment configuration'),

  // Metadata
  status: z.enum(['draft', 'development', 'staging', 'production']).describe('Site status'),
  version: z.string().describe('Site version for tracking changes'),
  createdAt: z.string().datetime().describe('When site was created'),
  updatedAt: z.string().datetime().describe('Last update timestamp'),
})
export type SiteConfig = z.infer<typeof SiteConfig>

// =============================================================================
// SITE TEMPLATES (Pre-configured site types)
// =============================================================================

export const SiteTemplate = z.object({
  id: z.string().describe('Template identifier'),
  name: z.string().describe('Template name'),
  description: z.string().describe('What this template is for'),
  siteType: SiteType.describe('Type of site this template creates'),

  // Pre-configured structure
  defaultPages: z.array(z.object({
    title: z.string().describe('Page title'),
    path: z.string().describe('Page path'),
    template: PageTemplate.describe('Page template to use'),
    required: z.boolean().describe('Whether this page is required'),
  })).describe('Default pages included in this template'),

  // Configuration suggestions
  suggestedFeatures: z.array(z.string()).describe('Recommended features for this template'),
  suggestedIntegrations: z.array(z.string()).describe('Recommended integrations'),

  // Use cases
  bestFor: z.array(z.string()).describe('Business types or use cases this template suits'),
  examples: z.array(z.string()).describe('Example sites using this template'),
})
export type SiteTemplate = z.infer<typeof SiteTemplate>
