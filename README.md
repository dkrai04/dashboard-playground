# Dashboard Playground

A Next.js dashboard prototype built with the [Blend Design System](https://www.npmjs.com/package/@juspay/blend-design-system).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19 |
| Design System | [@juspay/blend-design-system](https://www.npmjs.com/package/@juspay/blend-design-system) |
| Icons | [@phosphor-icons/react](https://phosphoricons.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Language | TypeScript (strict) |
| Testing | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, global CSS)
│   ├── not-found.tsx           # Custom 404 page
│   ├── globals.css             # Tailwind v4 + CSS variables
│   └── (dashboard)/            # Route group — shares the sidebar shell
│       ├── layout.tsx          # Wraps all dashboard pages in BlendShell
│       ├── BlendShell.tsx      # SSR boundary (loads shell client-side)
│       ├── BlendShellInner.tsx # Client: Sidebar + ThemeProvider
│       ├── error.tsx           # Error boundary
│       ├── loading.tsx         # Suspense fallback
│       ├── page.tsx            # Home (/)
│       ├── dashboard/          # /dashboard
│       ├── analytics/          # /analytics
│       └── prototypes/
│           └── [...slug]/      # Catch-all for all prototype routes
├── components/
│   └── page-container.tsx      # Shared padding wrapper for page content
├── lib/
│   ├── nav.config.ts           # Nav items — single source of truth
│   ├── nav.tsx                 # Builds sidebar DirectoryData from nav config
│   ├── constants.ts            # Shared layout constants
│   └── dynamic-client.ts      # SSR-disabled dynamic import helper
├── test/
│   ├── setup.ts                # Vitest global setup (@testing-library/jest-dom)
│   ├── nav.test.ts             # Unit tests for buildSidebarData
│   └── page-container.test.tsx # Component tests for PageContainer
└── types/
    └── layout.ts               # Shared TypeScript types
```

## Adding a New Module

1. Create `src/app/(dashboard)/<module>/page.tsx`
2. Add an entry to `NAV_ITEMS` in `src/lib/nav.config.ts`
3. Wrap page content in `<PageContainer>` for consistent padding

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage report |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
