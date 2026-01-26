# Replit.md

## Overview

This is a Bulgarian youth movement website ("Младежко Движение" / "Next Gen Bulgaria") built as a full-stack TypeScript application. The project serves as a landing page with sections for mission, gallery, articles, contact forms, and volunteer/donation calls-to-action. Content is managed through Sanity CMS, and the frontend features a luxury-themed design with animations and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom luxury theme using CSS variables
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactive elements
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Fonts**: Plus Jakarta Sans (sans-serif), Playfair Display (serif), Space Grotesk

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **API Design**: RESTful endpoints under `/api/*`
- **Build System**: Vite for client bundling, esbuild for server bundling
- **Development**: Hot module replacement via Vite dev server proxied through Express

### Data Storage
- **Content Management**: Sanity CMS (headless)
  - Blog posts, meetings, and galleries stored in Sanity
  - Content fetched via GROQ queries in server/sanity.ts
  - Image URLs generated using Sanity's image URL builder
  - SanityStorage class in server/storage.ts wraps Sanity fetch functions
  - Returns empty arrays gracefully when SANITY_PROJECT_ID is not configured

### Project Structure
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

### Key Design Patterns
- **Path Aliases**: `@/` maps to client/src, `@shared/` maps to shared/
- **Component Organization**: Section-based components for landing page, reusable UI in components/ui
- **API Pattern**: Server fetches from Sanity, transforms data, serves to client
- **Build Optimization**: Server dependencies are selectively bundled to reduce cold start times

## External Dependencies

### Content Management
- **Sanity CMS**: Headless CMS for blogs, meetings, and galleries
  - Requires `SANITY_PROJECT_ID` environment variable
  - Optional `SANITY_DATASET` (defaults to "production")
  - Uses `@sanity/client` for queries and `@sanity/image-url` for image handling

### Frontend Services
- **Google Fonts**: Playfair Display, Plus Jakarta Sans, Space Grotesk loaded via CDN

### Development Tools
- **Replit Plugins**: Cartographer, dev banner, runtime error overlay (development only)
- **Vite Plugins**: Custom meta-images plugin for OpenGraph tags with Replit deployment URLs

### npm Package Categories
- **UI Primitives**: Full Radix UI component suite
- **Animation**: Framer Motion, tw-animate-css
- **Forms**: React Hook Form, Zod, @hookform/resolvers
- **Carousel**: Embla Carousel
- **Date Handling**: date-fns
- **HTTP Client**: Included in build allowlist (axios)