/**
 * App Abstraction Schemas
 *
 * Defines the structure for applications built as part of startup concepts.
 * Apps can be web, mobile, desktop, CLI, API, extensions, or embedded solutions.
 *
 * This schema captures:
 * - App type and framework configuration
 * - Runtime configuration and environment variables
 * - Deployment targets and CDN config
 * - Analytics and telemetry setup
 */

import { z } from 'zod'

// =============================================================================
// APP TYPE & FRAMEWORK
// =============================================================================

export const AppType = z.enum([
  'web',        // Web application (browser-based)
  'mobile',     // Mobile application (iOS/Android)
  'desktop',    // Desktop application (Windows/Mac/Linux)
  'cli',        // Command-line interface tool
  'api',        // API service
  'extension',  // Browser extension or IDE plugin
  'embedded',   // Embedded/widget solution
]).describe('Type of application being built')
export type AppType = z.infer<typeof AppType>

export const AppFramework = z.object({
  name: z.string().describe('Framework name (e.g., "Next.js", "React Native", "Electron")'),
  version: z.string().describe('Framework version'),
  language: z.string().describe('Primary programming language'),
  runtime: z.string().describe('Runtime environment (e.g., "Node.js", "Deno", "Browser")'),

  // Additional framework details
  buildTool: z.string().optional().describe('Build tool used (e.g., "webpack", "vite", "turbopack")'),
  packageManager: z.string().optional().describe('Package manager (e.g., "pnpm", "npm", "yarn")'),
  uiLibrary: z.string().optional().describe('UI library if applicable (e.g., "React", "Vue", "Svelte")'),
  styling: z.string().optional().describe('Styling solution (e.g., "Tailwind CSS", "CSS Modules", "styled-components")'),
}).describe('Framework and technology stack for the application')
export type AppFramework = z.infer<typeof AppFramework>

// =============================================================================
// APP CONFIGURATION
// =============================================================================

export const EnvironmentVariable = z.object({
  key: z.string().describe('Environment variable key'),
  description: z.string().describe('What this variable configures'),
  required: z.boolean().describe('Whether this variable is required'),
  defaultValue: z.string().optional().describe('Default value if not required'),
  sensitive: z.boolean().describe('Whether this contains sensitive data (secrets, API keys)'),
  example: z.string().optional().describe('Example value for documentation'),
}).describe('Environment variable configuration')
export type EnvironmentVariable = z.infer<typeof EnvironmentVariable>

export const FeatureFlag = z.object({
  key: z.string().describe('Feature flag key'),
  name: z.string().describe('Human-readable feature name'),
  description: z.string().describe('What this feature does'),
  defaultEnabled: z.boolean().describe('Whether enabled by default'),
  rolloutPercentage: z.number().min(0).max(100).optional().describe('Percentage rollout if gradual'),
  targetSegments: z.array(z.string()).optional().describe('Customer segments this applies to'),
}).describe('Feature flag for controlling app functionality')
export type FeatureFlag = z.infer<typeof FeatureFlag>

export const AppConfig = z.object({
  // Environment configuration
  environments: z.array(z.enum(['development', 'staging', 'production', 'preview'])).describe('Available environments'),
  environmentVariables: z.array(EnvironmentVariable).describe('Environment variables needed'),

  // Feature flags
  featureFlags: z.array(FeatureFlag).optional().describe('Feature flags for gradual rollout'),

  // API configuration
  apiConfig: z.object({
    baseUrl: z.string().describe('Base API URL'),
    timeout: z.number().optional().describe('Request timeout in milliseconds'),
    retryAttempts: z.number().optional().describe('Number of retry attempts for failed requests'),
    rateLimiting: z.object({
      enabled: z.boolean(),
      requestsPerMinute: z.number().optional(),
    }).optional().describe('Rate limiting configuration'),
  }).optional().describe('API configuration if app consumes external APIs'),

  // Security configuration
  security: z.object({
    corsOrigins: z.array(z.string()).optional().describe('Allowed CORS origins'),
    cspPolicy: z.string().optional().describe('Content Security Policy'),
    authProvider: z.string().optional().describe('Authentication provider (e.g., "Auth0", "Clerk", "NextAuth")'),
  }).optional().describe('Security and authentication configuration'),
}).describe('Runtime configuration for the application')
export type AppConfig = z.infer<typeof AppConfig>

// =============================================================================
// APP DEPLOYMENT
// =============================================================================

export const DeploymentTarget = z.enum([
  'vercel',           // Vercel platform
  'netlify',          // Netlify platform
  'aws',              // AWS (EC2, ECS, Lambda, etc.)
  'gcp',              // Google Cloud Platform
  'azure',            // Microsoft Azure
  'cloudflare',       // Cloudflare Pages/Workers
  'fly',              // Fly.io
  'railway',          // Railway
  'render',           // Render
  'heroku',           // Heroku
  'digital-ocean',    // Digital Ocean
  'self-hosted',      // Self-hosted infrastructure
  'app-store',        // iOS App Store
  'play-store',       // Google Play Store
  'electron-forge',   // Electron desktop distribution
  'npm-registry',     // NPM for CLI tools
]).describe('Deployment target platform')
export type DeploymentTarget = z.infer<typeof DeploymentTarget>

export const CDNConfig = z.object({
  provider: z.enum(['cloudflare', 'aws-cloudfront', 'fastly', 'bunny', 'vercel', 'netlify']).describe('CDN provider'),
  enabled: z.boolean().describe('Whether CDN is enabled'),

  // Cache configuration
  cacheRules: z.array(z.object({
    path: z.string().describe('Path pattern to cache'),
    ttl: z.number().describe('Cache TTL in seconds'),
    queryStringHandling: z.enum(['ignore', 'include', 'exclude-specific']).optional(),
  })).optional().describe('Cache rules for different paths'),

  // Geographic distribution
  regions: z.array(z.string()).optional().describe('Regions for edge caching'),

  // Custom domain
  customDomain: z.string().optional().describe('Custom CDN domain if configured'),
}).describe('CDN configuration for asset delivery')
export type CDNConfig = z.infer<typeof CDNConfig>

export const AppDeployment = z.object({
  target: DeploymentTarget,
  domain: z.string().describe('Primary domain for the app'),
  alternativeDomains: z.array(z.string()).optional().describe('Alternative domains (aliases)'),

  // CDN
  cdn: CDNConfig.optional().describe('CDN configuration if using a CDN'),

  // Build configuration
  buildConfig: z.object({
    command: z.string().describe('Build command'),
    outputDirectory: z.string().describe('Build output directory'),
    installCommand: z.string().optional().describe('Install command for dependencies'),
    nodeVersion: z.string().optional().describe('Node.js version to use'),
  }).optional().describe('Build configuration for deployment'),

  // Scaling
  scaling: z.object({
    type: z.enum(['static', 'serverless', 'container', 'vm']).describe('Deployment type'),
    autoscaling: z.boolean().optional().describe('Whether autoscaling is enabled'),
    minInstances: z.number().optional().describe('Minimum instances'),
    maxInstances: z.number().optional().describe('Maximum instances'),
    cpuLimit: z.string().optional().describe('CPU limit per instance'),
    memoryLimit: z.string().optional().describe('Memory limit per instance'),
  }).optional().describe('Scaling configuration'),

  // Environment-specific deployments
  environments: z.record(z.string(), z.object({
    url: z.string().describe('Environment-specific URL'),
    branch: z.string().optional().describe('Git branch for this environment'),
  })).optional().describe('Environment-specific deployment configs'),
}).describe('Deployment configuration and infrastructure setup')
export type AppDeployment = z.infer<typeof AppDeployment>

// =============================================================================
// APP ANALYTICS
// =============================================================================

export const AnalyticsProvider = z.enum([
  'google-analytics',     // Google Analytics (GA4)
  'plausible',            // Plausible Analytics
  'fathom',               // Fathom Analytics
  'umami',                // Umami Analytics
  'mixpanel',             // Mixpanel
  'amplitude',            // Amplitude
  'segment',              // Segment (data pipeline)
  'posthog',              // PostHog (product analytics)
  'heap',                 // Heap Analytics
  'hotjar',               // Hotjar (heatmaps, recordings)
  'logrocket',            // LogRocket (session replay)
  'sentry',               // Sentry (error tracking)
  'custom',               // Custom analytics solution
]).describe('Analytics and tracking provider')
export type AnalyticsProvider = z.infer<typeof AnalyticsProvider>

export const EventTracking = z.object({
  category: z.string().describe('Event category (e.g., "User Actions", "Commerce")'),
  events: z.array(z.object({
    name: z.string().describe('Event name'),
    description: z.string().describe('What this event tracks'),
    properties: z.record(z.string(), z.string()).optional().describe('Event properties to capture'),
  })).describe('Events to track in this category'),
}).describe('Event tracking configuration')
export type EventTracking = z.infer<typeof EventTracking>

export const AppAnalytics = z.object({
  // Core analytics
  providers: z.array(z.object({
    provider: AnalyticsProvider,
    enabled: z.boolean().describe('Whether this provider is enabled'),
    apiKey: z.string().optional().describe('API key or tracking ID (reference to env var)'),
    config: z.record(z.string(), z.unknown()).optional().describe('Provider-specific configuration'),
  })).describe('Analytics providers configured for the app'),

  // Privacy
  privacy: z.object({
    cookieConsent: z.boolean().describe('Whether cookie consent is required'),
    anonymizeIp: z.boolean().describe('Whether to anonymize IP addresses'),
    respectDoNotTrack: z.boolean().describe('Whether to respect DNT browser setting'),
    dataRetentionDays: z.number().optional().describe('How long to retain analytics data'),
  }).describe('Privacy and compliance settings for analytics'),

  // Event tracking
  eventTracking: z.array(EventTracking).optional().describe('Custom event tracking configuration'),

  // Conversion goals
  conversionGoals: z.array(z.object({
    id: z.string().describe('Goal identifier'),
    name: z.string().describe('Goal name'),
    description: z.string().describe('What this goal measures'),
    value: z.number().optional().describe('Monetary value of this conversion'),
    eventTrigger: z.string().optional().describe('Event that triggers this goal'),
  })).optional().describe('Conversion goals to track'),

  // Performance monitoring
  performanceMonitoring: z.object({
    enabled: z.boolean(),
    provider: z.enum(['web-vitals', 'sentry', 'datadog', 'new-relic', 'custom']).optional(),
    metrics: z.array(z.enum([
      'first-contentful-paint',
      'largest-contentful-paint',
      'first-input-delay',
      'cumulative-layout-shift',
      'time-to-first-byte',
      'time-to-interactive',
    ])).optional().describe('Web vitals and performance metrics to track'),
  }).optional().describe('Performance monitoring configuration'),

  // Error tracking
  errorTracking: z.object({
    enabled: z.boolean(),
    provider: z.enum(['sentry', 'bugsnag', 'rollbar', 'airbrake', 'custom']).optional(),
    sampleRate: z.number().min(0).max(1).optional().describe('Error sampling rate (0-1)'),
    ignoreErrors: z.array(z.string()).optional().describe('Error patterns to ignore'),
  }).optional().describe('Error tracking and monitoring'),
}).describe('Analytics, telemetry, and monitoring configuration')
export type AppAnalytics = z.infer<typeof AppAnalytics>

// =============================================================================
// APP (Complete Definition)
// =============================================================================

export const App = z.object({
  // Identity
  id: z.string().describe('Unique identifier for this app'),
  name: z.string().describe('Application name'),
  description: z.string().describe('What this application does'),

  // Association
  startupConceptId: z.string().describe('Startup concept this app belongs to'),

  // Type & framework
  type: AppType,
  framework: AppFramework,

  // Repository
  repository: z.object({
    url: z.string().describe('Git repository URL'),
    branch: z.string().describe('Primary branch name'),
    monorepo: z.boolean().optional().describe('Whether this is in a monorepo'),
    path: z.string().optional().describe('Path within monorepo if applicable'),
  }).optional().describe('Source code repository information'),

  // Configuration
  config: AppConfig,

  // Deployment
  deployment: AppDeployment,

  // Analytics
  analytics: AppAnalytics,

  // Status
  status: z.enum([
    'planned',        // Not yet started
    'development',    // In active development
    'staging',        // Deployed to staging
    'production',     // Live in production
    'maintenance',    // Under maintenance
    'deprecated',     // Deprecated, not actively maintained
  ]).describe('Current status of the application'),

  // Version
  version: z.string().describe('Current version (semver)'),

  // Metadata
  createdAt: z.string().datetime().describe('When app was created'),
  updatedAt: z.string().datetime().describe('Last update time'),
  launchedAt: z.string().datetime().optional().describe('When app was launched to production'),

  // Documentation
  documentation: z.object({
    readme: z.string().optional().describe('Path to README file'),
    apiDocs: z.string().optional().describe('URL or path to API documentation'),
    userGuide: z.string().optional().describe('URL or path to user guide'),
    changelog: z.string().optional().describe('Path to CHANGELOG file'),
  }).optional().describe('Documentation links and resources'),

  // Dependencies
  dependencies: z.object({
    apis: z.array(z.string()).optional().describe('External APIs this app depends on'),
    services: z.array(z.string()).optional().describe('External services this app depends on'),
    databases: z.array(z.string()).optional().describe('Databases used by this app'),
  }).optional().describe('External dependencies'),

  // Tags
  tags: z.array(z.string()).optional().describe('Tags for categorization'),

  // Notes
  notes: z.string().optional().describe('Internal notes about this app'),
}).describe('Complete application definition for a startup concept')
export type App = z.infer<typeof App>

// =============================================================================
// APP TEMPLATE
// =============================================================================

export const AppTemplate = z.object({
  id: z.string().describe('Template identifier'),
  name: z.string().describe('Template name'),
  description: z.string().describe('What this template provides'),

  // Template type
  type: AppType,
  frameworks: z.array(AppFramework).describe('Supported frameworks for this template'),

  // Pre-configured settings
  defaultConfig: AppConfig.partial().describe('Default configuration'),
  recommendedDeployment: DeploymentTarget.describe('Recommended deployment target'),
  recommendedAnalytics: z.array(AnalyticsProvider).describe('Recommended analytics providers'),

  // Features included
  features: z.array(z.string()).describe('Features included in this template'),

  // Setup instructions
  setupInstructions: z.array(z.string()).describe('Steps to set up from this template'),

  // Repository template
  templateRepo: z.string().optional().describe('Git repository template URL'),
}).describe('Application template for quick startup creation')
export type AppTemplate = z.infer<typeof AppTemplate>

// =============================================================================
// APP REGISTRY
// =============================================================================

export const AppRegistry = z.object({
  apps: z.array(App).describe('All registered applications'),
  templates: z.array(AppTemplate).describe('Available app templates'),

  // Statistics
  stats: z.object({
    totalApps: z.number(),
    byType: z.record(AppType, z.number()),
    byStatus: z.record(z.string(), z.number()),
    totalProduction: z.number(),
  }).optional().describe('Registry statistics'),
}).describe('Registry of all applications across startup concepts')
export type AppRegistry = z.infer<typeof AppRegistry>
