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

## Database Schema

### User

- `id`: Unique identifier
- `email`: Unique email address
- `name`: Optional user name
- `notes`: One-to-many relation with notes

### Note

- `id`: Unique identifier
- `title`: Note title
- `content`: Note content
- `userId`: Foreign key to User
- `createdAt` / `updatedAt`: Timestamps
