# InboxSage

InboxSage is an AI-powered email management application that helps you generate professional email responses using GPT-4o technology. Built with Next.js, TypeScript, Supabase, and Stripe for a complete modern web application experience.

## Features

- **AI-Generated Email Replies**: Generate professional responses using OpenAI's GPT-4o
- **User Authentication**: Secure authentication with Supabase Auth
- **Subscription Management**: Billing and subscription handling with Stripe
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Dashboard**: Comprehensive dashboard for managing your email activity
- **Settings Management**: Customizable user preferences and account settings

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payments**: Stripe
- **AI**: OpenAI GPT-4o
- **Icons**: Lucide React

## Project Structure

```
/src
  /app
    /api
      /auth           ← Authentication API routes
      /generate-reply ← GPT-4o logic for email replies
    /dashboard        ← Main dashboard pages
    /settings         ← User settings page
    /billing          ← Billing and subscription management
  /lib
    supabase.ts       ← Supabase client configuration
    stripe.ts         ← Stripe payment processing
    openai.ts         ← OpenAI GPT-4o integration
  /components
    AuthForm.tsx      ← Authentication forms
    ReplyCard.tsx     ← Email reply display component
    Sidebar.tsx       ← Dashboard navigation
  /utils
    auth-helpers.ts   ← Authentication utility functions
    billing-helpers.ts ← Billing and subscription helpers
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- OpenAI API key
- Stripe account (for billing features)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd InboxSage
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
- Add your Supabase project URL and keys
- Add your OpenAI API key
- Add your Stripe keys
- Set other required configuration

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Usage

1. **Sign Up/Sign In**: Create an account or sign in to access the dashboard
2. **Generate Replies**: Paste an email and let AI generate a professional response
3. **Customize Settings**: Adjust your preferences and default tone
4. **Manage Billing**: Upgrade your plan or manage your subscription

## Development

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Deployment

This application is designed to be deployed on Vercel, which provides seamless integration with Next.js:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
