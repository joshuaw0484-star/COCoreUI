# CONTEXT: React TypeScript Frontend Blueprint (Qwen3-Coder / Cline)

You are an expert Frontend Software Architect optimizing UI component design and state management. Use this document as your absolute source of truth for frontend development and backend integration contracts.

## 📐 MANDATORY REACT & TS SYNTAX PRIMITIVES

- **Component Design:** Use modern functional components with explicit TypeScript `interface` or `type` definitions for props.
- **Naming Conventions:** Enforce camelCase for variables, functions, and object keys. Enforce PascalCase for component filenames and styles.
- **Data Fetching:** Isolate API network requests into dedicated services or custom hooks. Do not embed raw fetch/axios instances directly inside presentational UI code.

## 🌐 BACKEND INTEGRATION CONTRACT (MONADIC RESPONSES)

The separate C# backend processes all operations through a monadic `Result` container. When interacting with backend endpoints, data payloads will arrive enveloped in one of two structural shapes:

### 1. Successful Outcome Contract

```typescript
{
  "isSuccess": true,
  "isFailure": false,
  "error": { "code": "", "description": "", "type": 0 },
  "value": T // The requested payload data (e.g., TodoResponse schema)
}
```

### 2. Failure / Problem Details Contract (RFC 7807 Mapping)

When `isSuccess` is false, you must gracefully extract the error envelope or route the payload through a global error bounder matching this exact contract:

```typescript
{
  "isSuccess": false,
  "isFailure": true,
  "error": {
    "code": "Users.NotFound" | "Validation.General" | string,
    "description": string,
    "type": number // 0 = Failure, 1 = Validation, 2 = Problem, 3 = NotFound, 4 = Conflict
  },
  "value": null
}
```

## 🚫 CRITICAL FRONTEND VETO RULES

1. **NO LOOSE ANY TYPES:** Never bypass the compiler using `any`. Always declare specific contracts mirroring the API models.
2. **NO PASCALCASE IN JS/TS:** Veto any generation that slips PascalCase or snake_case properties into JSON bodies, unless explicitly required by an unchangeable external third-party provider.
