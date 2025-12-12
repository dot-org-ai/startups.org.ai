/**
 * UI Component Types
 *
 * Base types for component props - kept minimal so components
 * can use simple names like Hero, FAQ, Pricing
 */

import type { ReactNode } from 'react'

// =============================================================================
// BASE COMPONENT PROPS
// =============================================================================

export interface BaseProps {
  className?: string
  children?: ReactNode
}

export interface ComponentProps extends BaseProps {
  id?: string
  'data-testid'?: string
}

export interface InteractiveProps extends ComponentProps {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

// =============================================================================
// LAYOUT
// =============================================================================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type Alignment = 'start' | 'center' | 'end' | 'stretch'
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

// =============================================================================
// VARIANTS
// =============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled'
export type InputVariant = 'default' | 'filled' | 'outline'

// =============================================================================
// STATE
// =============================================================================

export interface LoadingState {
  loading?: boolean
  loadingText?: string
}

export interface ErrorState {
  error?: string | Error | null
  onRetry?: () => void
}

export interface AsyncState extends LoadingState, ErrorState {}

// =============================================================================
// SLOT PATTERN
// =============================================================================

export type SlotContent = ReactNode | (() => ReactNode)

export interface Slots<T extends string> {
  slots?: Partial<Record<T, SlotContent>>
}
