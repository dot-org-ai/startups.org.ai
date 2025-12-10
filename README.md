# startups.org.ai

> Type system and workflow for programmatic startup generation

A complete type system for generating, enriching, and validating startup concepts at scale. Built on foundational business ontologies (O*NET, NAICS, APQC) and AI-powered enrichment, startups.org.ai enables systematic exploration of the startup solution space through cross-product generation and viability scoring.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   startups.org.ai                           │
├─────────────────────────────────────────────────────────────┤
│  Ontology → Enrich → Generate → Score → Validate           │
│                                                             │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐    │
│  │Industry │   │Occupation│   │ Process │   │  Task   │    │
│  │ (NAICS) │   │ (O*NET) │   │ (APQC)  │   │         │    │
│  └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘    │
│       │             │              │             │         │
│       └─────────────┴──────┬───────┴─────────────┘         │
│                           AI                                │
│                      Enrichment                             │
│       ┌─────────────────────────────────────────┐           │
│       │  • Business Model Canvas                │           │
│       │  • Pain Points & Workflows              │           │
│       │  • Process Bottlenecks                  │           │
│       │  • Problem Stacks (StoryBrand)          │           │
│       └─────────────┬───────────────────────────┘           │
│                     │                                       │
│              Startup Generation                             │
│       ┌─────────────────────────────────────────┐           │
│       │  Hypothesis × Ontology → Concepts       │           │
│       │  • Name & Brand Identity                │           │
│       │  • Viability Scoring (0-100)            │           │
│       │  • AI Service Definition                │           │
│       └─────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Installation

```bash
npm install startups.org.ai
```

## Quick Start

```typescript
import { enrichIndustry, enrichOccupation, generateStartupConcept } from 'startups.org.ai/ai'
import type { Industry, Occupation, Hypothesis } from 'startups.org.ai'

// 1. Define ontology entities
const industry: Industry = {
  ns: 'industries.org.ai',
  type: 'Industry',
  id: 'Healthcare',
  name: 'Healthcare Services',
  code: '621',
  description: 'Ambulatory health care services',
  shortName: 'Healthcare',
  sourceType: 'NAICS',
  level: 3
}

const occupation: Occupation = {
  ns: 'jobs.org.ai',
  type: 'Job',
  id: 'ChiefFinancialOfficer',
  name: 'Chief Financial Officer',
  code: '11-3031.00',
  description: 'Plan, direct, or coordinate accounting, investing, banking...',
  shortName: 'CFO',
  sourceType: 'ONET',
  occupationCode: '11-3031.00'
}

// 2. Enrich with AI-generated business intelligence
const enrichedIndustry = await enrichIndustry(industry, {
  includeCanvas: true,
  includeTrends: true
})

const enrichedOccupation = await enrichOccupation(occupation, {
  includePainPoints: true,
  includeWorkflows: true
})

// 3. Define hypothesis (meta-strategy)
const hypothesis: Hypothesis = {
  id: 'headless-saas-for-agents',
  name: 'Headless SaaS for AI Agents',
  description: 'API-first B2B SaaS designed for agent consumption',
  status: 'active',
  businessModel: { /* ... */ },
  dimensions: { /* ... */ }
}

// 4. Generate startup concept
const concept = await generateStartupConcept({
  hypothesis,
  industry: enrichedIndustry,
  occupation: enrichedOccupation
})

console.log(concept.name.name)          // "AgentFin"
console.log(concept.oneLiner)           // "API-first financial workflow automation for CFOs"
console.log(concept.viability.overall)  // 87
console.log(concept.viability.tier)     // "A"
```

## API Overview

### Core Types

```typescript
// Ontology - Business taxonomy entities
import {
  Occupation,      // O*NET occupations (jobs)
  Industry,        // NAICS industries
  Process,         // APQC process framework
  Task,            // O*NET tasks
  Service,         // NAPCS services
  Technology,      // Technology categories
  Market          // Geographic markets
} from 'startups.org.ai'

// Enrichments - AI-generated intelligence
import {
  EnrichedIndustry,       // + Business model canvas, trends, competition
  EnrichedOccupation,     // + Pain points, workflows, buying triggers
  EnrichedProcess,        // + Bottlenecks, diagrams, optimization opportunities
  ProblemStack           // StoryBrand-style problem framework
} from 'startups.org.ai'

// Startup Concept
import {
  StartupConcept,        // Complete startup definition
  StartupName,           // Name, domain, tagline
  BrandIdentity,         // Visual identity, voice, tone
  ViabilityScore        // 0-100 score across 8 dimensions
} from 'startups.org.ai'

// Hypothesis - Meta-strategies
import {
  Hypothesis,            // Startup generation strategy
  BusinessModel,         // Business model configuration
  ValueProposition,      // Value prop framework
  PricingStrategy       // Pricing models
} from 'startups.org.ai'
```

### AI Functions

```typescript
import { configureAI } from 'startups.org.ai/ai'

// Configure AI provider
configureAI({
  provider: 'anthropic',
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-20250514'
})

// Enrichment functions
import {
  enrichIndustry,         // Add business intelligence to industries
  enrichOccupation,       // Add pain points, workflows to occupations
  enrichProcess          // Add bottlenecks, diagrams to processes
} from 'startups.org.ai/ai'

// Generation functions
import {
  generateStartupConcept,  // Generate single startup concept
  generateStartupIdeas,    // Generate multiple variations
  scoreStartupConcept     // Score viability (0-100)
} from 'startups.org.ai/ai'

// Service generation
import {
  generateProductizedService,  // Generate packaged service
  generateAIOverlays          // Generate coaching/analysis overlays
} from 'startups.org.ai/ai'
```

## Workflow

The complete startup generation workflow:

```typescript
import {
  enrichIndustry,
  enrichOccupation,
  generateStartupIdeas,
  scoreStartupConcept
} from 'startups.org.ai/ai'

// 1. Enrich ontology entities
const enriched = await Promise.all([
  enrichIndustry(industry),
  enrichOccupation(occupation),
  enrichProcess(process)
])

// 2. Generate concepts from hypothesis
const ideas = await generateStartupIdeas({
  hypothesis,
  industries: [enriched[0]],
  occupations: [enriched[1]],
  maxConcepts: 100
})

// 3. Score and filter
const scored = await Promise.all(
  ideas.map(idea => scoreStartupConcept(idea))
)

const topTier = scored
  .filter(c => c.viability.tier === 'S' || c.viability.tier === 'A')
  .sort((a, b) => b.viability.overall - a.viability.overall)

// 4. Select for experimentation
const selected = topTier.slice(0, 10)
```

## Viability Scoring

Concepts are scored across 8 dimensions:

- **Market Size** - TAM/SAM potential
- **Problem Severity** - How painful the problem is
- **Solution Fit** - How well AI solves it
- **Competition** - Competitive landscape (higher = less competition)
- **GTM Ease** - Ease of reaching customers
- **Monetization** - Ability to monetize
- **Defensibility** - Moat potential
- **Timing** - Market timing

```typescript
concept.viability = {
  overall: 87,
  tier: 'A',
  dimensions: {
    marketSize: { score: 85, weight: 0.20, rationale: '...' },
    problemSeverity: { score: 90, weight: 0.15, rationale: '...' },
    // ... other dimensions
  },
  recommendation: 'test-hypothesis'
}
```

## Related Packages

| Package | Description |
|---------|-------------|
| [service-builder](https://npmjs.com/package/service-builder) | Build AI-delivered services |
| [startup-builder](https://npmjs.com/package/startup-builder) | Build autonomous startups |
| [ai-functions](https://npmjs.com/package/ai-functions) | Type-safe AI function calling |
| [ai-providers](https://npmjs.com/package/ai-providers) | Unified LLM provider interface |

## License

MIT
