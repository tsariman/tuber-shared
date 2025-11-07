# Tuber-Shared: Types and Interfaces Tutorial

## Overview

`tuber-shared` is a lightweight TypeScript library built with Preact that provides shared interfaces and types for the Tuber project ecosystem. This tutorial explains how to add, update, and maintain types and interfaces in this project.

## Project Structure

```
tuber-shared/
├── src/
│   ├── interfaces/          # All interface definitions
│   │   ├── index.ts        # Exports all interfaces
│   │   ├── IAbstractState.ts
│   │   ├── IState.ts
│   │   └── ...
│   ├── state/              # State-related exports
│   ├── types/              # Custom type definitions
│   │   └── jsx.d.ts       # JSX namespace definitions
│   ├── common.types.ts     # Common type definitions
│   ├── constants.client.ts # Client constants
│   └── index.ts           # Main entry point
├── dist/                   # Compiled output (auto-generated)
├── package.json
├── tsconfig.json
└── pnpm-workspace.yaml
```

## Development Workflow

### 1. Adding a New Interface

#### Step 1: Create the Interface File
Create a new file in `src/interfaces/` following the naming convention `I{Name}.ts`:

```typescript
// src/interfaces/IMyNewInterface.ts
import { CSSProperties } from 'react';

interface IMyNewInterface {
  id: string;
  name: string;
  isActive?: boolean;
  styles?: CSSProperties;
  metadata?: Record<string, any>;
}

export default IMyNewInterface;
```

#### Step 2: Export the Interface
Add the export to `src/interfaces/index.ts`:

```typescript
// Add this line to src/interfaces/index.ts
export type { default as IMyNewInterface } from './IMyNewInterface';
```

#### Step 3: Build and Test
```bash
# Build the project
pnpm run build

# Verify the interface is available
# Check dist/interfaces/index.d.ts for your export
```

### 2. Updating Existing Interfaces

#### Step 1: Modify the Interface
```typescript
// src/interfaces/IExistingInterface.ts
interface IExistingInterface {
  id: string;
  name: string;
  // Add new optional property (non-breaking)
  newProperty?: string;
  // Add new required property (breaking change)
  requiredProperty: number;
}
```

#### Step 2: Consider Breaking Changes
- **Non-breaking**: Adding optional properties, making required properties optional
- **Breaking**: Adding required properties, removing properties, changing property types

#### Step 3: Update Version (if needed)
For breaking changes, consider updating the version in `package.json`:
```json
{
  "version": "0.2.0"  // Increment minor version for breaking changes
}
```

### 3. Adding Complex Types

#### Union Types
```typescript
// src/interfaces/IStateStatus.ts
export type StatusType = 'idle' | 'loading' | 'success' | 'error';

interface IStateStatus {
  status: StatusType;
  message?: string;
}

export default IStateStatus;
```

#### Generic Interfaces
```typescript
// src/interfaces/IApiResponse.ts
interface IApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

export default IApiResponse;
```

#### Extending Interfaces
```typescript
// src/interfaces/IExtendedCard.ts
import IStateCard from './IStateCard';

interface IExtendedCard extends IStateCard {
  customActions?: JSX.Element[];
  theme?: 'light' | 'dark';
}

export default IExtendedCard;
```

### 4. Working with Framework-Specific Types

#### Preact/React Components
```typescript
// src/interfaces/IComponentProps.ts
import { ComponentChildren } from '../types/jsx';

interface IComponentProps {
  children?: ComponentChildren;
  className?: string;
  onClick?: (event: Event) => void;
}

export default IComponentProps;
```

#### MUI Integration (if using MUI)
```typescript
// src/interfaces/IMuiComponent.ts
import { SxProps } from '@mui/material/styles';

interface IMuiComponent {
  sx?: SxProps;
  variant?: 'outlined' | 'filled' | 'standard';
}

export default IMuiComponent;
```

### 5. Namespace and Utility Types

#### Creating Utility Types
```typescript
// src/types/utilities.ts
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
```

#### Adding to Main Export
```typescript
// src/index.ts
export * from './interfaces';
export * from './state';
export * from './types/utilities';
```

## Build and Development

### Development Mode
```bash
# Watch mode - rebuilds on file changes
pnpm run dev
```

### Production Build
```bash
# Clean previous build
pnpm run clean

# Build for distribution
pnpm run build
```

### Verify Build
```bash
# Check generated files
ls dist/

# Verify main export
cat dist/index.d.ts
```

## Usage in Consumer Projects

### Import Examples
```typescript
// Import specific interfaces
import type { IStateApp, IStateCard } from 'tuber-shared';

// Import all types
import type * as TuberTypes from 'tuber-shared';

// Import utility types
import type { Optional, RequiredKeys } from 'tuber-shared';
```

### Type Usage
```typescript
// Using in component props
interface MyComponentProps {
  appState: IStateApp;
  cardConfig: IStateCard;
  status: StatusType;
}

// Using with generics
const apiResponse: IApiResponse<IStateApp> = {
  data: myAppState,
  status: 200,
  message: 'Success',
  timestamp: new Date()
};
```

## Best Practices

### 1. Naming Conventions
- **Interfaces**: `I{PascalCase}` (e.g., `IStateCard`)
- **Types**: `{PascalCase}Type` (e.g., `StatusType`)
- **Files**: Match the main export name

### 2. Documentation
```typescript
/**
 * Represents the state configuration for a card component
 * @interface IStateCard
 */
interface IStateCard {
  /** Unique identifier for the card */
  id: string;
  
  /** Display title of the card */
  title: string;
  
  /** Optional card description */
  description?: string;
}
```

### 3. Backward Compatibility
- Always add optional properties when possible
- Use union types for extensibility
- Consider deprecation warnings for removed properties

### 4. Testing
```typescript
// src/__tests__/interfaces.test.ts
import type { IStateCard } from '../interfaces';

// Type-only tests
const validCard: IStateCard = {
  id: '1',
  title: 'Test Card'
};

// This should cause a TypeScript error if title is required
// const invalidCard: IStateCard = { id: '1' };
```

## Troubleshooting

### Common Issues

#### JSX Namespace Errors
If you get JSX namespace errors, ensure `src/types/jsx.d.ts` is properly configured.

#### MUI Type Errors
Make sure `@mui/material` is in devDependencies and consuming projects have it installed.

#### Build Failures
```bash
# Clear everything and rebuild
pnpm run clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

#### Import Errors in Consumer Projects
Ensure the workspace is properly configured:
```yaml
# pnpm-workspace.yaml in consumer project
packages:
  - '.'
  - '../tuber-shared'
```

### Debugging Tips

1. **Check generated types**: Look in `dist/` folder after building
2. **Verify exports**: Ensure all interfaces are exported in `src/interfaces/index.ts`
3. **Test imports**: Try importing in a simple TypeScript file
4. **Check dependencies**: Ensure peer dependencies are satisfied

## Version Management

### Semantic Versioning
- **Patch** (0.1.1): Bug fixes, non-breaking changes
- **Minor** (0.2.0): New features, breaking changes in pre-1.0
- **Major** (1.0.0): Stable API, major breaking changes

### Release Process
1. Update version in `package.json`
2. Build and test: `pnpm run build`
3. Commit changes
4. Tag release (if using git tags)
5. Consumer projects will automatically get updates via workspace protocol

## Advanced Topics

### Custom JSX Types
```typescript
// src/types/jsx.d.ts - extend as needed
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'custom-element': { customProp?: string };
    }
  }
}
```

### Conditional Types
```typescript
// src/types/conditional.ts
export type APIResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
```

### Template Literal Types
```typescript
// src/types/literals.ts
export type EventName<T extends string> = `on${Capitalize<T>}`;
export type CSSProperty = `--${string}`;
```

---

## Contributing

When adding new interfaces:
1. Follow the established patterns
2. Add comprehensive TypeScript documentation
3. Test in a consumer project
4. Update this tutorial if adding new patterns
5. Build successfully before committing

For questions or issues, refer to the main project documentation or create an issue in the repository.