/**
 * App Domain Types
 *
 * Uses discriminated unions via `type` prop for variants
 */

import type { ReactNode } from 'react'
import type { PersonData, SocialData } from './startup'
import type { ActionData, FeatureList, LinkList, StatList } from './business'
import type { NavItem, NavList, TabList } from './content'

// =============================================================================
// APP BASE
// =============================================================================

export interface AppBase {
  name: string
  description?: string
  logo?: string
  icon?: string
  version?: string
  nav?: NavList
  user?: UserData
}

export interface UserData {
  id: string
  name: string
  email?: string
  avatar?: string
  role?: string
}

// =============================================================================
// APP VARIANTS (Discriminated Union)
// =============================================================================

export interface DeveloperDashboardApp extends AppBase {
  type: 'developer-dashboard'
  projects?: ProjectData[]
  apiKeys?: ApiKeyData[]
  stats?: DeveloperStats
  activeProjectId?: string
}

export interface AdminApp extends AppBase {
  type: 'admin'
  sections?: NavList
  superAdmin?: boolean
  impersonating?: { userId: string; userName: string }
}

export interface AnalyticsApp extends AppBase {
  type: 'analytics'
  dataSources?: DataSourceData[]
  workspaces?: WorkspaceData[]
  activeWorkspaceId?: string
}

export interface ProjectManagerApp extends AppBase {
  type: 'project-manager'
  workspaces?: WorkspaceData[]
  projects?: ProjectListData[]
  activeWorkspaceId?: string
}

export interface SettingsApp extends AppBase {
  type: 'settings'
  categories?: SettingsCategoryData[]
  activeCategoryId?: string
}

export interface ClientPortalApp extends AppBase {
  type: 'client-portal'
  organization?: OrganizationData
  modules?: ('projects' | 'invoices' | 'documents' | 'support' | 'reports')[]
}

export interface DatabaseEditorApp extends AppBase {
  type: 'database-editor'
  connections?: ConnectionData[]
  activeConnectionId?: string
  readOnly?: boolean
}

export interface CRMApp extends AppBase {
  type: 'crm'
  pipelines?: PipelineData[]
  activePipelineId?: string
}

export interface InboxApp extends AppBase {
  type: 'inbox'
  folders?: FolderData[]
  activeFolderId?: string
  unreadCount?: number
}

export interface CalendarApp extends AppBase {
  type: 'calendar'
  calendars?: CalendarData[]
  view?: 'day' | 'week' | 'month' | 'year'
}

export interface KanbanApp extends AppBase {
  type: 'kanban'
  boards?: BoardData[]
  activeBoardId?: string
}

export interface ChatApp extends AppBase {
  type: 'chat'
  conversations?: ConversationData[]
  activeConversationId?: string
}

export interface FileManagerApp extends AppBase {
  type: 'file-manager'
  currentPath?: string
  viewMode?: 'grid' | 'list'
}

// Union of all app types
export type AppProps =
  | DeveloperDashboardApp
  | AdminApp
  | AnalyticsApp
  | ProjectManagerApp
  | SettingsApp
  | ClientPortalApp
  | DatabaseEditorApp
  | CRMApp
  | InboxApp
  | CalendarApp
  | KanbanApp
  | ChatApp
  | FileManagerApp

// Extract app type literals
export type AppType = AppProps['type']

// =============================================================================
// VIEW BASE (Screens within Apps)
// =============================================================================

export interface ViewBase {
  title: string
  description?: string
  loading?: boolean
  error?: string
  breadcrumbs?: BreadcrumbData[]
  actions?: ActionData[]
}

export interface BreadcrumbData {
  label: string
  href?: string
}

// =============================================================================
// VIEW VARIANTS (Discriminated Union)
// =============================================================================

export interface ListViewData extends ViewBase {
  type: 'list'
  columns: ColumnData[]
  data: Record<string, unknown>[]
  pagination?: PaginationData
  filters?: FilterData[]
  search?: boolean
  selectable?: boolean
  onCreate?: ActionData
}

export interface DetailViewData extends ViewBase {
  type: 'detail'
  fields: FieldData[]
  tabs?: TabList
  onEdit?: ActionData
  onDelete?: ActionData
  backHref?: string
}

export interface FormViewData extends ViewBase {
  type: 'form'
  fields: FormFieldData[]
  submitLabel?: string
  onCancel?: ActionData
}

export interface DashboardViewData extends ViewBase {
  type: 'dashboard'
  stats?: StatList
  charts?: ChartData[]
  widgets?: WidgetData[]
}

export interface SettingsViewData extends ViewBase {
  type: 'settings'
  sections: SettingsSectionData[]
  activeSection?: string
}

export interface OnboardingViewData extends ViewBase {
  type: 'onboarding'
  steps: OnboardingStepData[]
  currentStep?: number
  skippable?: boolean
}

export interface EmptyViewData extends ViewBase {
  type: 'empty'
  icon?: string
  message?: string
  action?: ActionData
}

// Union of all view types
export type ViewProps =
  | ListViewData
  | DetailViewData
  | FormViewData
  | DashboardViewData
  | SettingsViewData
  | OnboardingViewData
  | EmptyViewData

// Extract view type literals
export type ViewType = ViewProps['type']

// =============================================================================
// PANEL BASE (Regions within Views)
// =============================================================================

export interface PanelBase {
  title?: string
  description?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
}

// =============================================================================
// PANEL VARIANTS
// =============================================================================

export interface DataTablePanel extends PanelBase {
  type: 'data-table'
  columns: ColumnData[]
  data: Record<string, unknown>[]
  pagination?: PaginationData
  search?: boolean
}

export interface FormPanel extends PanelBase {
  type: 'form'
  fields: FormFieldData[]
  submitLabel?: string
}

export interface DetailPanel extends PanelBase {
  type: 'detail'
  fields: FieldData[]
}

export interface StatsPanel extends PanelBase {
  type: 'stats'
  stats: StatList
  columns?: 2 | 3 | 4
}

export interface ChartPanel extends PanelBase {
  type: 'chart'
  chart: ChartData
}

export interface ActivityPanel extends PanelBase {
  type: 'activity'
  items: ActivityItem[]
}

// Union of all panel types
export type PanelProps =
  | DataTablePanel
  | FormPanel
  | DetailPanel
  | StatsPanel
  | ChartPanel
  | ActivityPanel

// =============================================================================
// SUPPORTING TYPES
// =============================================================================

export interface ProjectData {
  id: string
  name: string
  environment?: 'development' | 'staging' | 'production'
  status?: 'active' | 'paused' | 'error'
}

export interface ApiKeyData {
  id: string
  name: string
  key: string
  createdAt?: string
  lastUsed?: string
  expiresAt?: string
  scopes?: string[]
}

export interface DeveloperStats {
  apiCalls?: number
  errors?: number
  latency?: number
}

export interface DataSourceData {
  id: string
  name: string
  type: string
  status?: 'connected' | 'syncing' | 'error'
  lastSync?: string
}

export interface WorkspaceData {
  id: string
  name: string
  icon?: string
  color?: string
}

export interface ProjectListData {
  id: string
  name: string
  status?: 'active' | 'archived' | 'completed'
  progress?: number
}

export interface SettingsCategoryData {
  id: string
  label: string
  icon?: string
  items: SettingsItemData[]
}

export interface SettingsItemData {
  id: string
  label: string
  href?: string
  badge?: string
}

export interface OrganizationData {
  id: string
  name: string
  logo?: string
}

export interface ConnectionData {
  id: string
  name: string
  type: 'postgresql' | 'mysql' | 'mongodb' | 'sqlite' | 'redis'
  status?: 'connected' | 'disconnected' | 'error'
}

export interface PipelineData {
  id: string
  name: string
  stages: StageData[]
}

export interface StageData {
  id: string
  name: string
  color?: string
}

export interface FolderData {
  id: string
  name: string
  icon?: string
  count?: number
}

export interface CalendarData {
  id: string
  name: string
  color?: string
  visible?: boolean
}

export interface BoardData {
  id: string
  name: string
  columns: BoardColumnData[]
}

export interface BoardColumnData {
  id: string
  name: string
  color?: string
}

export interface ConversationData {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  unread?: number
}

export interface ColumnData {
  id: string
  header: string
  accessorKey?: string
  sortable?: boolean
  width?: string | number
}

export interface FieldData {
  label: string
  value: string | number | boolean | null
  copyable?: boolean
  href?: string
}

export interface FormFieldData {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file'
  required?: boolean
  placeholder?: string
  description?: string
  options?: { value: string; label: string }[]
  defaultValue?: unknown
}

export interface FilterData {
  id: string
  label: string
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'text' | 'number'
  options?: { value: string; label: string }[]
}

export interface PaginationData {
  page: number
  pageSize: number
  total: number
  totalPages?: number
}

export interface ChartData {
  id: string
  title?: string
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'sparkline'
  data: unknown
}

export interface WidgetData {
  id: string
  type: string
  title?: string
  span?: 1 | 2 | 3 | 4
  config?: Record<string, unknown>
}

export interface SettingsSectionData {
  id: string
  title: string
  description?: string
  fields?: FormFieldData[]
}

export interface OnboardingStepData {
  id: string
  title: string
  description?: string
  optional?: boolean
  completed?: boolean
}

export interface ActivityItem {
  id: string
  title: string
  description?: string
  date?: string
  icon?: string
  user?: PersonData
}
