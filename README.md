# tuber-shared

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Shared TypeScript types, constants, and interfaces** — The single source of truth between the BookmarkTube client and server.

This package ensures **type safety and consistency** across the entire full-stack application.

**Live Demo**: [https://BookmarkTube.com](https://BookmarkTube.com)

## Purpose

- Eliminates duplication of types and constants between frontend and backend
- Provides centralized definitions for:
  - JSON:API resources and relationships
  - Authentication & authorization
  - Video platform configurations
  - UI state shapes and controllers
  - API endpoints and error codes
  - Configuration schemas

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Build**: tsc + pnpm workspace
- **Exports**: Clean barrel exports from `src/index.ts`

## Key Contents

```ts
src/
├── @types/                  # Global type augmentations
├── interfaces/              # Core interfaces (JSON:API, handlers, etc.)
├── state/                   # UI controller state types
├── common.types.ts          # Shared primitives and utilities
├── constants.client.ts      # Client-specific constants
├── constants.server.ts      # Server-specific constants
├── configuration.ts         # Configuration schemas
├── AbstractConfiguration.ts # Base config class
├── index.ts                 # Main exports
└── ...
```

## Installation (in workspace)

This is a **pnpm workspace package**. From the root:

```bash
pnpm install
```

Then import in client or server:

```ts
import { 
  EP_AUTH, 
  BookmarkResource, 
  StateFormItem 
} from '@tuber/shared';
```

## Architecture Benefits

- **Zero duplication** — One place to update a type and both client & server stay in sync.
- **Strong typing** across API boundaries (especially powerful with JSON:API).
- **Centralized constants** — Endpoints, error codes, video platform IDs, etc.
- Supports the sophisticated controller pattern used in the client.

## Related Repositories

- **[tuber-client](https://github.com/tsariman/tuber-client)** — React 19 frontend
- **[tuber-server](https://github.com/tsariman/tuber-server)** — Fastify + MongoDB backend

## Development

```bash
pnpm --filter tuber-shared build    # Compile TypeScript
pnpm --filter tuber-shared lint     # Run linting
```

See `TYPES_TUTORIAL.md` for detailed type usage patterns.

## Roadmap

- Expand shared validation schemas (Zod or similar)
- More comprehensive JSON:API type helpers
- Utility functions for common operations

---

**Made with ❤️ by Riviere King**
