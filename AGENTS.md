# Repository Guidelines

## Project Structure & Module Organization
This Next.js 16 app keeps code under `src/`. Routes and `/api` handlers live in `src/pages`. UI primitives sit in `src/components/ui` (shadcn-derived), while composition layers live in `src/components/layout` and `src/components/sections`. Shared integrations for Better Auth, TRPC, and MongoDB belong in `src/lib`, server-only routers stay in `src/server`, global styles live in `src/globals.css`, and static media stays in `public/`.

## Build, Test, and Development Commands
- `bun install` installs dependencies.
- `bun run dev` launches the app at http://localhost:3000 with hot reload.
- `bun run build` creates the production bundle and surfaces type errors.
- `bun run start` serves the built output locally—run it before deploying.
- `bun run lint` executes ESLint with the Core Web Vitals ruleset; treat warnings as blockers.

## Coding Style & Naming Conventions
- TypeScript runs in `strict` mode with the `@/*` alias; export explicit types from shared modules.
- Keep files kebab-case (`login-form.tsx`), components PascalCase, hooks camelCase.
- Favor Tailwind utility classes plus helpers such as `cn()` over ad-hoc CSS, and extend `src/components/ui` before inventing new primitives.
- ESLint (`eslint-config-next/core-web-vitals` + TypeScript) is authoritative; document inline disables if unavoidable.

## Testing Guidelines
Every change must at least pass `tsc --noEmit` and `bun run lint`.

## Security & Configuration Tips
Secrets are stored in .env which you do not have access to, see .env.example to know which secrets are defined.

# General instructions
- Keep the code simple.
- Follow KISS and DRY
- Always prefer importing existing types or types from existing librairies rather than defining new ones
- Do not use the typescript types "any" or "unknown" unless absolutely necessary
- Always prefer non-optional parameters, only create components or functions with optional input parameters when absolutely necessary
- For up to date documentation refer to `/better-auth-doc`
- Do not cast variables into types