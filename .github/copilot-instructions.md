# Copilot Instructions for InboxSage

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
InboxSage is an AI-powered email management application built with Next.js, TypeScript, and modern web technologies.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payments**: Stripe
- **AI**: OpenAI GPT-4o for email reply generation
- **Deployment**: Vercel (recommended)

## Architecture Guidelines
- Use the App Router pattern for all routes
- Implement API routes under `/app/api/`
- Store components in `/components/` directory
- Use `/lib/` for utility functions and service configurations
- Follow TypeScript best practices with proper type definitions
- Use Server Components by default, Client Components when needed
- Implement proper error handling and loading states

## Key Features
1. **Authentication**: Secure user authentication with Supabase
2. **Email Reply Generation**: AI-powered email responses using GPT-4o
3. **Dashboard**: User dashboard for managing emails and settings
4. **Billing**: Stripe integration for subscription management
5. **Settings**: User preferences and account management

## Coding Standards
- Use functional components with TypeScript
- Implement proper error boundaries
- Use async/await for asynchronous operations
- Follow Next.js performance best practices
- Implement proper SEO and accessibility features
- Use environment variables for sensitive configuration
