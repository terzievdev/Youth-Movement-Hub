# Next Gen Bulgaria – Website

## Overview

This is a Bulgarian youth movement website (**„Младежко Движение“ / "Next Gen Bulgaria"**) built as a full‑stack TypeScript application. The project serves as a landing page with sections for mission, gallery, articles, contact forms, and volunteer/donation calls‑to‑action. Content is managed through **Sanity CMS**, and the frontend features a luxury‑themed design with animations and modern UI components.

---

## User Preferences

**Preferred communication style:** Simple, everyday language.

---

## System Architecture

### Frontend Architecture

* **Framework:** React 18 + TypeScript
* **Routing:** Wouter (lightweight React router)
* **Styling:** Tailwind CSS v4 with custom luxury theme using CSS variables
* **UI Components:** shadcn/ui (New York style) built on Radix UI primitives
* **Animations:** Framer Motion (page transitions & interactive elements)
* **State Management:** TanStack React Query
* **Form Handling:** React Hook Form + Zod validation
* **Fonts:** Plus Jakarta Sans, Playfair Display, Space Grotesk

### Backend Architecture

* **Runtime:** Node.js + Express
* **Language:** TypeScript (tsx in development, esbuild in production)
* **API Design:** REST endpoints under `/api/*`
* **Build System:**

  * Vite → client bundling
  * esbuild → server bundling
* **Development:** Hot module replacement via Vite dev server proxied through Express

---

## Data Storage

* **Content Management:** Sanity CMS (headless)
* Blog posts, meetings, and galleries stored in Sanity
* Content fetched via **GROQ queries** in `server/sanity.ts`
* Image URLs generated using Sanity image URL builder
* `SanityStorage` class in `server/storage.ts` wraps Sanity fetch functions
* Returns empty arrays gracefully when `SANITY_PROJECT_ID` is not configured

---

## Project Structure

```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components (ui/ for shadcn, layout/, sections/)
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── sanity.ts     # Sanity client and queries
│   └── static.ts     # Static file serving
├── shared/           # Shared types and schemas (Zod)
└── script/           # Build scripts
```

---

## Key Design Patterns

* **Path Aliases**

  * `@/` → `client/src`
  * `@shared/` → `shared/`

* **Component Organization**

  * Section‑based landing page components
  * Reusable UI inside `components/ui`

* **API Pattern**

  * Server fetches data from Sanity
  * Transforms response
  * Serves to client

* **Build Optimization**

  * Selective dependency bundling to reduce cold‑start times

---

## External Dependencies

### Content Management

**Sanity CMS**

* Requires `SANITY_PROJECT_ID` environment variable
* Optional `SANITY_DATASET` (default: `production`)
* Uses:

  * `@sanity/client`
  * `@sanity/image-url`

### Frontend Services

* Google Fonts (CDN): Playfair Display, Plus Jakarta Sans, Space Grotesk

### Development Tools

* Replit Plugins: Cartographer, dev banner, runtime error overlay (development only)
* Vite Plugins: Custom meta‑images plugin for OpenGraph tags with Replit deployment URLs

---

## npm Package Categories

* **UI Primitives:** Full Radix UI component suite
* **Animation:** Framer Motion, tw-animate-css
* **Forms:** React Hook Form, Zod, @hookform/resolvers
* **Carousel:** Embla Carousel
* **Date Handling:** date-fns
* **HTTP Client:** axios
