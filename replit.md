# Overview

This is a professional pest control service website for "National Pest Control Service" based in Delhi. The application is a full-stack web solution built with React and Express.js, featuring a modern UI for showcasing pest control services and handling customer inquiries. The site includes service information, company details, contact forms, and business information for a pest control company with over 10 years of experience serving homes, schools, colleges, and organizations in Delhi.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with a custom design system using CSS variables
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod schema validation
- **Design System**: "New York" style from shadcn/ui with neutral base colors

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for contact form submissions
- **Request Handling**: Express middleware for JSON parsing, logging, and error handling
- **Development**: Custom Vite integration for hot module replacement in development

## Data Storage
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL adapter
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Tables**: Users table and contact submissions table with proper typing

## Form Validation & Data Flow
- **Schema Validation**: Zod schemas shared between client and server
- **Contact Form**: Validates name, phone, address, email (optional), and description fields
- **Error Handling**: Comprehensive validation with user-friendly error messages
- **Success Feedback**: Toast notifications for form submission status

## Development Setup
- **Hot Reloading**: Vite development server with Express integration
- **TypeScript**: Strict type checking across the entire codebase
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Build Process**: Separate builds for client (Vite) and server (esbuild)

# External Dependencies

## UI & Styling
- **shadcn/ui**: Complete component library with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variants
- **Embla Carousel**: Carousel/slider functionality

## Data & Forms
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **Drizzle ORM**: Type-safe database queries and migrations

## Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **PostgreSQL**: Primary database system
- **Connect PG Simple**: PostgreSQL session store (if sessions are implemented)

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Utility Libraries
- **Date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional CSS class management
- **Nanoid**: Unique ID generation
- **Wouter**: Lightweight React router