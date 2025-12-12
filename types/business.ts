/**
 * Business Domain Types
 */

// =============================================================================
// BUSINESS MODEL
// =============================================================================

export interface BusinessModelData {
  type: 'saas' | 'marketplace' | 'api' | 'agency' | 'productized' | 'platform' | 'ecommerce' | 'subscription' | 'freemium'
  target?: 'b2b' | 'b2c' | 'b2b2c' | 'b2g'
  revenue?: string
  moat?: string
}

// =============================================================================
// PRICING
// =============================================================================

export interface PriceData {
  amount: number | string
  currency?: string
  interval?: 'once' | 'monthly' | 'yearly' | 'weekly' | 'daily'
  original?: number | string
}

export type PriceList = PriceData[]

export interface PricingTierData {
  id: string
  name: string
  description?: string
  price: PriceData
  yearlyPrice?: PriceData
  features?: FeatureItem[]
  cta?: ActionData
  badge?: string
  highlighted?: boolean
  popular?: boolean
}

export type PricingTierList = PricingTierData[]

// =============================================================================
// FEATURES
// =============================================================================

export interface FeatureItem {
  name: string
  description?: string
  icon?: string
  included?: boolean
  value?: string | number | boolean
}

export type FeatureList = FeatureItem[]

// =============================================================================
// VALUE PROPOSITION
// =============================================================================

export interface ValuePropItem {
  headline: string
  description?: string
  proof?: string
  icon?: string
}

export type ValuePropList = ValuePropItem[]

// =============================================================================
// CUSTOMER
// =============================================================================

export interface CustomerData {
  segment: string
  persona?: string
  pain?: string
  gain?: string
}

export type CustomerList = CustomerData[]

// =============================================================================
// SERVICE
// =============================================================================

export interface ServiceItem {
  id: string
  name: string
  description?: string
  price?: PriceData
  duration?: string
  deliverables?: string[]
  features?: FeatureItem[]
}

export type ServiceList = ServiceItem[]

// =============================================================================
// PRODUCT
// =============================================================================

export interface ProductItem {
  id: string
  name: string
  description?: string
  price?: PriceData
  image?: string
  images?: ImageData[]
  features?: FeatureItem[]
  category?: string
  tags?: string[]
}

export type ProductList = ProductItem[]

// =============================================================================
// ACTION
// =============================================================================

export interface ActionData {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
  icon?: string
  disabled?: boolean
  loading?: boolean
}

export type ActionList = ActionData[]

// =============================================================================
// STAT
// =============================================================================

export interface StatItem {
  label: string
  value: string | number
  description?: string
  change?: number
  trend?: 'up' | 'down' | 'flat'
  icon?: string
}

export type StatList = StatItem[]

// =============================================================================
// IMAGE
// =============================================================================

export interface ImageData {
  src: string
  alt?: string
  width?: number
  height?: number
  caption?: string
}

export type ImageList = ImageData[]

// =============================================================================
// LINK
// =============================================================================

export interface LinkItem {
  label: string
  href: string
  icon?: string
  external?: boolean
  badge?: string | number
}

export type LinkList = LinkItem[]
