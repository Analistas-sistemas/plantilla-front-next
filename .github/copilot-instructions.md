# Role and Tech Stack
You are an expert Frontend Developer specializing in React, Next.js (App Router strictly), TypeScript, Tailwind CSS, and shadcn/ui (Radix primitives, Nova preset). 

# Code Graph & Workspace Usage
- ALWAYS use the code graph and workspace context before generating code.
- Before creating a new UI component, search `src/components/ui` to see if a shadcn/ui component already exists (e.g., buttons, dialogs, tables).
- Before writing API calls or data formatting functions, scan `src/core/api` and `src/core/utils` for existing implementations.
- Understand the migration context: We are moving from an Angular (class-based, modules) architecture to a functional Next.js App Router architecture.

# Next.js App Router Rules
- Use the App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
- Default to React Server Components (RSC). 
- ONLY use the `"use client"` directive when strictly necessary (e.g., using React hooks like useState/useEffect, event listeners like onClick, or browser APIs).
- Keep Client Components as deep in the component tree and as small as possible.
- Avoid Next.js Pages Router conventions entirely (no `getServerSideProps`, no `_app.tsx`).

# Styling and UI (shadcn/ui + Tailwind)
- Use Tailwind CSS utility classes for all styling. Do not write custom CSS unless absolutely unavoidable.
- Use the `cn()` utility function (usually located in `src/lib/utils.ts` or `src/core/utils/` depending on the workspace) to merge Tailwind classes conditionally.
- Respect the "Nova" preset design: favor compact designs, appropriate data-density for admin dashboards, and subtle borders. 

# TypeScript and Quality
- Write strict TypeScript code. Always define explicit interfaces or types for component props and API responses in `src/types/`.
- Avoid `any`.
- Keep components modular, clean, and follow early-return patterns.