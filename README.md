# AI Notes

An AI-powered note-taking application built with Next.js, Prisma, and PostgreSQL.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_notes?schema=public"
```

**Get Clerk Keys:**

1. Sign up at [https://clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys from the dashboard

Replace `username` and `password` with your PostgreSQL credentials.

### 3. Generate Prisma Client & Push Schema

```bash
npm run db:generate
npm run db:push
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Access the Dashboard

1. Sign in using the buttons on the landing page
2. Navigate to `/dashboard` to manage your notes
3. Create, edit, and delete notes with full CRUD operations

## Database Commands

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database (no migration)
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio GUI

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI (New York style)
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Features

### ✅ Landing Page

- Hero section with AI-powered messaging
- Feature showcase (6 key features)
- FAQ section with accordion
- Responsive navigation
- Sign in/Sign up with Clerk

### ✅ Dashboard

- **Full CRUD Operations** - Create, read, update, delete notes
- **Responsive Grid Layout** - 1/2/3 columns based on screen size
- **Real-time Updates** - Instant feedback on all operations
- **Loading States** - Smooth loading indicators
- **Error Handling** - Graceful error messages
- **Empty States** - Helpful onboarding
- **Date Formatting** - "Updated 2 minutes ago" style
- **Confirmation Dialogs** - Prevent accidental deletions

## Database Schema

### User

- `id`: Clerk user ID (primary key)
- `email`: Unique email address
- `name`: Optional user name
- `notes`: One-to-many relation with notes

### Note

- `id`: Unique identifier
- `title`: Note title
- `content`: Note content (text field)
- `userId`: Foreign key to User (Clerk ID)
- `createdAt` / `updatedAt`: Timestamps

## API Routes

- `GET /api/notes` - Fetch all user notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/[id]` - Fetch a single note
- `PATCH /api/notes/[id]` - Update a note
- `DELETE /api/notes/[id]` - Delete a note

All routes are protected with Clerk authentication.
