/**
 * API Abstraction Schemas
 *
 * Comprehensive Zod schemas for defining API specifications, endpoints,
 * routing, authentication, rate limiting, versioning, and documentation.
 *
 * These schemas enable programmatic API design and generation, supporting
 * multiple API specification types (OpenAPI, GraphQL, gRPC, tRPC) with
 * full type safety and AI-friendly descriptions.
 *
 * Each .describe() serves as the AI prompt for generating that field.
 */

import { z } from 'zod'

// =============================================================================
// API SPECIFICATION TYPES
// =============================================================================

export const APISpecType = z.enum([
  'openapi',        // OpenAPI/Swagger REST API
  'graphql',        // GraphQL API
  'trpc',           // tRPC type-safe API
  'grpc',           // gRPC protocol buffers API
]).describe('The type of API specification being used')
export type APISpecType = z.infer<typeof APISpecType>

export const OpenAPIVersion = z.enum([
  '2.0',            // Swagger 2.0
  '3.0.0',          // OpenAPI 3.0.0
  '3.0.3',          // OpenAPI 3.0.3
  '3.1.0',          // OpenAPI 3.1.0
]).describe('OpenAPI specification version')
export type OpenAPIVersion = z.infer<typeof OpenAPIVersion>

// =============================================================================
// HTTP METHODS & STATUS CODES
// =============================================================================

export const HTTPMethod = z.enum([
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'TRACE',
]).describe('HTTP request method')
export type HTTPMethod = z.infer<typeof HTTPMethod>

export const HTTPStatusCode = z.number().int().min(100).max(599).describe('HTTP status code (100-599)')
export type HTTPStatusCode = z.infer<typeof HTTPStatusCode>

export const HTTPStatusCategory = z.enum([
  'informational',  // 1xx
  'success',        // 2xx
  'redirection',    // 3xx
  'client-error',   // 4xx
  'server-error',   // 5xx
]).describe('HTTP status code category')
export type HTTPStatusCategory = z.infer<typeof HTTPStatusCategory>

// =============================================================================
// AUTHENTICATION & AUTHORIZATION
// =============================================================================

export const AuthMethod = z.enum([
  'api-key',        // API key authentication
  'bearer',         // Bearer token (JWT, OAuth access token)
  'oauth',          // OAuth 2.0 flow
  'jwt',            // JSON Web Token
  'basic',          // HTTP Basic Authentication
  'digest',         // HTTP Digest Authentication
  'session',        // Session-based authentication
  'mutual-tls',     // Mutual TLS (mTLS)
  'none',           // No authentication required
]).describe('Authentication method for API access')
export type AuthMethod = z.infer<typeof AuthMethod>

export const AuthLocation = z.enum([
  'header',         // Authorization header
  'query',          // Query parameter
  'cookie',         // Cookie
  'body',           // Request body
]).describe('Where the authentication credential is sent')
export type AuthLocation = z.infer<typeof AuthLocation>

export const OAuthFlow = z.enum([
  'authorization-code',     // Authorization code grant
  'implicit',               // Implicit grant (deprecated)
  'password',               // Resource owner password credentials
  'client-credentials',     // Client credentials grant
  'device-code',            // Device authorization grant
  'refresh-token',          // Refresh token flow
]).describe('OAuth 2.0 flow type')
export type OAuthFlow = z.infer<typeof OAuthFlow>

export const OAuth2Config = z.object({
  flow: OAuthFlow,
  authorizationUrl: z.string().url().optional().describe('OAuth authorization endpoint URL'),
  tokenUrl: z.string().url().describe('OAuth token endpoint URL'),
  refreshUrl: z.string().url().optional().describe('Token refresh endpoint URL'),
  scopes: z.record(z.string(), z.string()).describe('Available OAuth scopes with descriptions'),
})
export type OAuth2Config = z.infer<typeof OAuth2Config>

export const JWTConfig = z.object({
  algorithm: z.enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512']).describe('JWT signing algorithm'),
  issuer: z.string().describe('Expected JWT issuer'),
  audience: z.string().optional().describe('Expected JWT audience'),
  expiresIn: z.string().describe('Token expiration time (e.g., "1h", "7d")'),
  clockTolerance: z.number().optional().describe('Allowed clock skew in seconds'),
})
export type JWTConfig = z.infer<typeof JWTConfig>

export const AuthenticationScheme = z.object({
  name: z.string().describe('Name of the authentication scheme'),
  type: AuthMethod,
  location: AuthLocation.optional().describe('Where credential is provided (for api-key, basic)'),
  headerName: z.string().optional().describe('Header name (e.g., "Authorization", "X-API-Key")'),
  queryParamName: z.string().optional().describe('Query parameter name if location is query'),
  cookieName: z.string().optional().describe('Cookie name if location is cookie'),
  scheme: z.string().optional().describe('HTTP auth scheme (e.g., "Bearer", "Basic")'),
  bearerFormat: z.string().optional().describe('Bearer token format (e.g., "JWT")'),
  oauth2Config: OAuth2Config.optional().describe('OAuth 2.0 configuration'),
  jwtConfig: JWTConfig.optional().describe('JWT configuration'),
  description: z.string().optional().describe('Description of this authentication method'),
})
export type AuthenticationScheme = z.infer<typeof AuthenticationScheme>

export const Authorization = z.object({
  required: z.boolean().describe('Whether authorization is required for this endpoint'),
  schemes: z.array(z.string()).optional().describe('Authentication scheme names that can be used'),
  scopes: z.array(z.string()).optional().describe('Required OAuth scopes'),
  roles: z.array(z.string()).optional().describe('Required user roles'),
  permissions: z.array(z.string()).optional().describe('Required permissions'),
  customValidation: z.string().optional().describe('Custom authorization validation logic description'),
})
export type Authorization = z.infer<typeof Authorization>

// =============================================================================
// RATE LIMITING
// =============================================================================

export const RateLimitWindow = z.enum([
  'second',
  'minute',
  'hour',
  'day',
  'month',
]).describe('Time window for rate limiting')
export type RateLimitWindow = z.infer<typeof RateLimitWindow>

export const RateLimitStrategy = z.enum([
  'fixed-window',       // Fixed time window
  'sliding-window',     // Sliding time window
  'token-bucket',       // Token bucket algorithm
  'leaky-bucket',       // Leaky bucket algorithm
  'concurrent',         // Concurrent request limit
]).describe('Rate limiting algorithm strategy')
export type RateLimitStrategy = z.infer<typeof RateLimitStrategy>

export const RateLimitScope = z.enum([
  'global',         // Global limit across all users
  'user',           // Per authenticated user
  'api-key',        // Per API key
  'ip',             // Per IP address
  'endpoint',       // Per endpoint
  'tenant',         // Per tenant in multi-tenant systems
]).describe('Scope at which rate limits are applied')
export type RateLimitScope = z.infer<typeof RateLimitScope>

export const RateLimit = z.object({
  limit: z.number().int().positive().describe('Maximum number of requests allowed'),
  window: RateLimitWindow,
  windowSize: z.number().int().positive().describe('Size of the time window (e.g., 1 for per-second, 60 for per-minute)'),
  strategy: RateLimitStrategy,
  scope: RateLimitScope,
  burstAllowance: z.number().int().optional().describe('Additional requests allowed in burst'),
  retryAfterHeader: z.boolean().describe('Whether to include Retry-After header in 429 responses'),
  description: z.string().optional().describe('Description of this rate limit'),
})
export type RateLimit = z.infer<typeof RateLimit>

export const RateLimitTier = z.object({
  name: z.string().describe('Tier name (e.g., "free", "pro", "enterprise")'),
  limits: z.array(RateLimit).describe('Rate limits for this tier'),
  quotas: z.record(z.string(), z.number()).optional().describe('Resource quotas (e.g., storage, compute)'),
})
export type RateLimitTier = z.infer<typeof RateLimitTier>

export const RateLimiting = z.object({
  enabled: z.boolean().describe('Whether rate limiting is enabled'),
  default: RateLimit.optional().describe('Default rate limit if no tier specified'),
  tiers: z.array(RateLimitTier).optional().describe('Rate limit tiers for different user levels'),
  headers: z.object({
    limit: z.string().describe('Header name for limit (e.g., "X-RateLimit-Limit")'),
    remaining: z.string().describe('Header name for remaining (e.g., "X-RateLimit-Remaining")'),
    reset: z.string().describe('Header name for reset time (e.g., "X-RateLimit-Reset")'),
  }).optional().describe('Rate limit response headers'),
})
export type RateLimiting = z.infer<typeof RateLimiting>

// =============================================================================
// API VERSIONING
// =============================================================================

export const VersioningStrategy = z.enum([
  'url',            // /v1/users, /v2/users
  'header',         // Accept: application/vnd.api.v1+json
  'query',          // /users?version=1
  'content-type',   // Content-Type: application/vnd.api.v1+json
  'subdomain',      // v1.api.example.com
  'none',           // No versioning
]).describe('API versioning strategy')
export type VersioningStrategy = z.infer<typeof VersioningStrategy>

export const VersionFormat = z.enum([
  'integer',        // v1, v2, v3
  'semver',         // v1.0.0, v1.1.0, v2.0.0
  'date',           // 2024-01-01
]).describe('Version number format')
export type VersionFormat = z.infer<typeof VersionFormat>

export const APIVersion = z.object({
  version: z.string().describe('Version identifier (e.g., "v1", "1.0.0", "2024-01-01")'),
  status: z.enum(['active', 'deprecated', 'sunset']).describe('Version lifecycle status'),
  releaseDate: z.string().datetime().describe('When this version was released'),
  deprecationDate: z.string().datetime().optional().describe('When this version was deprecated'),
  sunsetDate: z.string().datetime().optional().describe('When this version will be removed'),
  changelog: z.string().optional().describe('Changes in this version'),
  breakingChanges: z.array(z.string()).optional().describe('Breaking changes from previous version'),
  migrationGuide: z.string().optional().describe('URL to migration guide'),
})
export type APIVersion = z.infer<typeof APIVersion>

export const APIVersioning = z.object({
  strategy: VersioningStrategy,
  format: VersionFormat,
  headerName: z.string().optional().describe('Header name for version (if strategy is header)'),
  queryParamName: z.string().optional().describe('Query param name (if strategy is query)'),
  urlPrefix: z.string().optional().describe('URL prefix format (e.g., "/v{version}")'),
  defaultVersion: z.string().describe('Default version if none specified'),
  currentVersion: z.string().describe('Current stable version'),
  versions: z.array(APIVersion).describe('All API versions'),
  deprecationPolicy: z.object({
    warningPeriod: z.string().describe('Notice period before deprecation (e.g., "6 months")'),
    sunsetPeriod: z.string().describe('Time between deprecation and removal (e.g., "12 months")'),
    notificationMethod: z.array(z.enum(['header', 'email', 'dashboard', 'changelog'])).describe('How users are notified'),
  }).optional().describe('Version deprecation policy'),
})
export type APIVersioning = z.infer<typeof APIVersioning>

// =============================================================================
// DATA SCHEMAS & VALIDATION
// =============================================================================

export const DataType = z.enum([
  'string',
  'number',
  'integer',
  'boolean',
  'array',
  'object',
  'null',
  'binary',
  'date',
  'datetime',
  'uuid',
  'email',
  'url',
  'enum',
]).describe('Data type for schema field')
export type DataType = z.infer<typeof DataType>

export const SchemaProperty: any = z.object({
  name: z.string().describe('Property name'),
  type: DataType,
  description: z.string().optional().describe('Property description'),
  required: z.boolean().describe('Whether this property is required'),
  nullable: z.boolean().optional().describe('Whether null values are allowed'),
  default: z.any().optional().describe('Default value if not provided'),
  example: z.any().optional().describe('Example value for documentation'),
  format: z.string().optional().describe('Data format (e.g., "email", "uuid", "date-time")'),
  pattern: z.string().optional().describe('Regex pattern for string validation'),
  minLength: z.number().optional().describe('Minimum string length'),
  maxLength: z.number().optional().describe('Maximum string length'),
  minimum: z.number().optional().describe('Minimum numeric value'),
  maximum: z.number().optional().describe('Maximum numeric value'),
  enum: z.array(z.any()).optional().describe('Allowed enum values'),
  items: z.lazy(() => SchemaProperty).optional().describe('Schema for array items'),
  properties: z.record(z.string(), z.lazy(() => SchemaProperty)).optional().describe('Object properties'),
  additionalProperties: z.boolean().optional().describe('Whether additional properties are allowed'),
  deprecated: z.boolean().optional().describe('Whether this property is deprecated'),
})
export type SchemaProperty = z.infer<typeof SchemaProperty>

export const DataSchema = z.object({
  name: z.string().describe('Schema name'),
  description: z.string().optional().describe('Schema description'),
  type: z.literal('object').describe('Schema type (always object for top-level)'),
  properties: z.record(z.string(), SchemaProperty).describe('Object properties'),
  required: z.array(z.string()).optional().describe('Required property names'),
  additionalProperties: z.boolean().optional().describe('Whether additional properties are allowed'),
  example: z.any().optional().describe('Complete example object'),
})
export type DataSchema = z.infer<typeof DataSchema>

// =============================================================================
// REQUEST & RESPONSE SPECIFICATIONS
// =============================================================================

export const ParameterLocation = z.enum([
  'path',           // URL path parameter
  'query',          // Query string parameter
  'header',         // HTTP header
  'cookie',         // Cookie
]).describe('Location of the parameter in the request')
export type ParameterLocation = z.infer<typeof ParameterLocation>

export const Parameter = z.object({
  name: z.string().describe('Parameter name'),
  location: ParameterLocation,
  description: z.string().optional().describe('Parameter description'),
  required: z.boolean().describe('Whether this parameter is required'),
  deprecated: z.boolean().optional().describe('Whether this parameter is deprecated'),
  schema: SchemaProperty.describe('Parameter schema definition'),
  examples: z.record(z.string(), z.any()).optional().describe('Named examples'),
})
export type Parameter = z.infer<typeof Parameter>

export const RequestBody = z.object({
  description: z.string().optional().describe('Request body description'),
  required: z.boolean().describe('Whether request body is required'),
  contentType: z.string().describe('Content type (e.g., "application/json", "multipart/form-data")'),
  schema: DataSchema.describe('Request body schema'),
  examples: z.record(z.string(), z.any()).optional().describe('Named examples'),
})
export type RequestBody = z.infer<typeof RequestBody>

export const ResponseBody = z.object({
  statusCode: HTTPStatusCode,
  description: z.string().describe('Response description'),
  contentType: z.string().describe('Content type (e.g., "application/json")'),
  schema: DataSchema.optional().describe('Response body schema'),
  headers: z.record(z.string(), z.object({
    description: z.string().describe('Header description'),
    schema: SchemaProperty.describe('Header value schema'),
  })).optional().describe('Response headers'),
  examples: z.record(z.string(), z.any()).optional().describe('Named examples'),
})
export type ResponseBody = z.infer<typeof ResponseBody>

// =============================================================================
// ENDPOINTS
// =============================================================================

export const EndpointTag = z.object({
  name: z.string().describe('Tag name for grouping endpoints'),
  description: z.string().optional().describe('Tag description'),
})
export type EndpointTag = z.infer<typeof EndpointTag>

export const Endpoint = z.object({
  operationId: z.string().describe('Unique identifier for this operation'),
  path: z.string().describe('URL path (e.g., "/users/{id}")'),
  method: HTTPMethod,
  summary: z.string().describe('Short summary of what this endpoint does'),
  description: z.string().optional().describe('Detailed description of the endpoint'),
  tags: z.array(z.string()).optional().describe('Tags for grouping and organization'),

  // Request
  parameters: z.array(Parameter).optional().describe('URL path, query, header, and cookie parameters'),
  requestBody: RequestBody.optional().describe('Request body specification'),

  // Response
  responses: z.array(ResponseBody).describe('Possible responses from this endpoint'),

  // Security
  authorization: Authorization.optional().describe('Authorization requirements'),

  // Rate limiting
  rateLimit: RateLimit.optional().describe('Specific rate limit for this endpoint'),

  // Metadata
  deprecated: z.boolean().optional().describe('Whether this endpoint is deprecated'),
  externalDocs: z.object({
    url: z.string().url().describe('URL to external documentation'),
    description: z.string().optional().describe('Description of external docs'),
  }).optional().describe('Link to external documentation'),

  // Implementation hints
  timeout: z.number().optional().describe('Request timeout in milliseconds'),
  cacheable: z.boolean().optional().describe('Whether responses can be cached'),
  cacheMaxAge: z.number().optional().describe('Cache max-age in seconds'),
  idempotent: z.boolean().optional().describe('Whether the operation is idempotent'),
})
export type Endpoint = z.infer<typeof Endpoint>

// =============================================================================
// ROUTES & MIDDLEWARE
// =============================================================================

export const MiddlewareType = z.enum([
  'authentication',     // Auth verification
  'authorization',      // Permission checking
  'rate-limiting',      // Rate limit enforcement
  'validation',         // Request validation
  'logging',            // Request/response logging
  'cors',               // CORS handling
  'compression',        // Response compression
  'caching',            // Response caching
  'error-handling',     // Error handler
  'request-id',         // Request ID generation
  'metrics',            // Metrics collection
  'custom',             // Custom middleware
]).describe('Type of middleware')
export type MiddlewareType = z.infer<typeof MiddlewareType>

export const Middleware = z.object({
  name: z.string().describe('Middleware name'),
  type: MiddlewareType,
  description: z.string().optional().describe('What this middleware does'),
  config: z.record(z.string(), z.any()).optional().describe('Middleware configuration'),
  order: z.number().describe('Execution order (lower numbers run first)'),
})
export type Middleware = z.infer<typeof Middleware>

export const CORSConfig = z.object({
  enabled: z.boolean().describe('Whether CORS is enabled'),
  origins: z.array(z.string()).describe('Allowed origins (* for all)'),
  methods: z.array(HTTPMethod).describe('Allowed HTTP methods'),
  allowedHeaders: z.array(z.string()).describe('Allowed request headers'),
  exposedHeaders: z.array(z.string()).optional().describe('Headers exposed to client'),
  credentials: z.boolean().describe('Whether to allow credentials'),
  maxAge: z.number().optional().describe('Preflight cache duration in seconds'),
})
export type CORSConfig = z.infer<typeof CORSConfig>

export const Route: any = z.object({
  path: z.string().describe('Base path for this route group (e.g., "/api/v1/users")'),
  description: z.string().optional().describe('Description of this route group'),
  tags: z.array(z.string()).optional().describe('Tags for this route group'),
  middleware: z.array(Middleware).optional().describe('Middleware applied to all endpoints in this route'),
  endpoints: z.array(Endpoint).describe('Endpoints under this route'),

  // Nested routes
  subroutes: z.array(z.lazy(() => Route)).optional().describe('Nested route groups'),
})
export type Route = z.infer<typeof Route>

// =============================================================================
// API DOCUMENTATION
// =============================================================================

export const DocFormat = z.enum([
  'swagger-ui',         // Swagger UI interface
  'redoc',              // ReDoc interface
  'rapidoc',            // RapiDoc interface
  'stoplight',          // Stoplight Elements
  'markdown',           // Markdown documentation
  'postman',            // Postman collection
  'insomnia',           // Insomnia collection
]).describe('Documentation format or tool')
export type DocFormat = z.infer<typeof DocFormat>

export const CodeSample = z.object({
  language: z.string().describe('Programming language (e.g., "javascript", "python", "curl")'),
  label: z.string().optional().describe('Label for this code sample'),
  source: z.string().describe('Code sample source'),
})
export type CodeSample = z.infer<typeof CodeSample>

export const APIDocumentation = z.object({
  enabled: z.boolean().describe('Whether API documentation is enabled'),
  title: z.string().describe('API documentation title'),
  description: z.string().describe('API description'),
  version: z.string().describe('Documentation version'),

  // URLs
  docsUrl: z.string().url().optional().describe('URL where documentation is hosted'),
  specUrl: z.string().url().optional().describe('URL to download OpenAPI/GraphQL spec'),

  // Formats
  formats: z.array(DocFormat).describe('Available documentation formats'),

  // Contact & licensing
  contact: z.object({
    name: z.string().optional().describe('Contact name'),
    email: z.string().email().optional().describe('Contact email'),
    url: z.string().url().optional().describe('Contact URL'),
  }).optional().describe('API contact information'),

  license: z.object({
    name: z.string().describe('License name'),
    url: z.string().url().optional().describe('License URL'),
  }).optional().describe('API license information'),

  // Terms
  termsOfService: z.string().url().optional().describe('Terms of service URL'),

  // Examples
  includeSamples: z.boolean().describe('Whether to include code samples'),
  sampleLanguages: z.array(z.string()).optional().describe('Languages for code samples'),

  // Customization
  theme: z.record(z.string(), z.any()).optional().describe('Documentation theme customization'),
  logo: z.string().url().optional().describe('Logo URL for documentation'),
})
export type APIDocumentation = z.infer<typeof APIDocumentation>

// =============================================================================
// SERVER & ENVIRONMENT
// =============================================================================

export const ServerEnvironment = z.enum([
  'production',
  'staging',
  'development',
  'testing',
  'local',
]).describe('Server environment')
export type ServerEnvironment = z.infer<typeof ServerEnvironment>

export const Server = z.object({
  url: z.string().url().describe('Server base URL'),
  description: z.string().optional().describe('Server description'),
  environment: ServerEnvironment.optional().describe('Environment this server represents'),
  variables: z.record(z.string(), z.object({
    default: z.string().describe('Default value'),
    description: z.string().optional().describe('Variable description'),
    enum: z.array(z.string()).optional().describe('Allowed values'),
  })).optional().describe('URL template variables'),
})
export type Server = z.infer<typeof Server>

// =============================================================================
// ERROR HANDLING
// =============================================================================

export const ErrorFormat = z.enum([
  'rfc7807',        // RFC 7807 Problem Details
  'json-api',       // JSON:API error format
  'custom',         // Custom error format
]).describe('Standard error response format')
export type ErrorFormat = z.infer<typeof ErrorFormat>

export const ErrorResponse = z.object({
  code: z.string().describe('Machine-readable error code'),
  message: z.string().describe('Human-readable error message'),
  statusCode: HTTPStatusCode,
  details: z.any().optional().describe('Additional error details'),
  documentation: z.string().url().optional().describe('URL to error documentation'),
})
export type ErrorResponse = z.infer<typeof ErrorResponse>

export const ErrorHandling = z.object({
  format: ErrorFormat,
  includeStackTrace: z.boolean().describe('Whether to include stack traces (dev only)'),
  standardErrors: z.array(ErrorResponse).describe('Standard error responses'),
})
export type ErrorHandling = z.infer<typeof ErrorHandling>

// =============================================================================
// COMPLETE API SPECIFICATION
// =============================================================================

export const APISpec = z.object({
  // Metadata
  id: z.string().describe('Unique API specification identifier'),
  name: z.string().describe('API name'),
  description: z.string().describe('API description'),
  type: APISpecType,

  // Versioning
  versioning: APIVersioning.describe('API versioning configuration'),

  // Servers
  servers: z.array(Server).describe('Available API servers'),
  basePath: z.string().optional().describe('Base path for all endpoints (e.g., "/api")'),

  // Authentication
  authenticationSchemes: z.array(AuthenticationScheme).describe('Available authentication methods'),
  defaultAuth: z.string().optional().describe('Default authentication scheme name'),

  // Rate limiting
  rateLimiting: RateLimiting.describe('Rate limiting configuration'),

  // Routes & endpoints
  routes: z.array(Route).describe('API route groups'),
  endpointTags: z.array(EndpointTag).optional().describe('Tags for organizing endpoints'),

  // Middleware
  globalMiddleware: z.array(Middleware).optional().describe('Middleware applied to all endpoints'),

  // CORS
  cors: CORSConfig.optional().describe('CORS configuration'),

  // Error handling
  errorHandling: ErrorHandling.describe('Error handling configuration'),

  // Documentation
  documentation: APIDocumentation.describe('API documentation configuration'),

  // Schemas
  schemas: z.record(z.string(), DataSchema).optional().describe('Reusable data schemas'),

  // Metadata
  createdAt: z.string().datetime().describe('When this spec was created'),
  updatedAt: z.string().datetime().describe('When this spec was last updated'),
  tags: z.array(z.string()).optional().describe('Tags for categorization'),
})
export type APISpec = z.infer<typeof APISpec>

// =============================================================================
// API GENERATION CONFIG
// =============================================================================

export const CodeGenerationTarget = z.enum([
  'typescript',
  'javascript',
  'python',
  'go',
  'java',
  'rust',
  'csharp',
  'php',
  'ruby',
]).describe('Target language for code generation')
export type CodeGenerationTarget = z.infer<typeof CodeGenerationTarget>

export const APIGenerationConfig = z.object({
  spec: APISpec.describe('API specification to generate from'),
  targets: z.array(CodeGenerationTarget).describe('Languages to generate code for'),
  outputPath: z.string().describe('Output directory path'),
  includeTests: z.boolean().describe('Whether to generate tests'),
  includeDocumentation: z.boolean().describe('Whether to generate documentation'),
  framework: z.string().optional().describe('Framework to use (e.g., "express", "fastapi", "gin")'),
})
export type APIGenerationConfig = z.infer<typeof APIGenerationConfig>

// =============================================================================
// API COMPARISON & MIGRATION
// =============================================================================

export const APIChange = z.object({
  type: z.enum(['added', 'removed', 'modified', 'deprecated']).describe('Type of change'),
  path: z.string().describe('Path to changed element (e.g., "/endpoints/GET /users")'),
  description: z.string().describe('Description of the change'),
  breaking: z.boolean().describe('Whether this is a breaking change'),
  migration: z.string().optional().describe('Migration steps if breaking'),
})
export type APIChange = z.infer<typeof APIChange>

export const APIComparison = z.object({
  oldVersion: z.string().describe('Previous API version'),
  newVersion: z.string().describe('New API version'),
  changes: z.array(APIChange).describe('List of changes between versions'),
  breakingChanges: z.number().describe('Count of breaking changes'),
  compatible: z.boolean().describe('Whether versions are backward compatible'),
})
export type APIComparison = z.infer<typeof APIComparison>
