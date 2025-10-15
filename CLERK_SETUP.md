# Clerk Authentication Setup Guide

## 🚀 Quick Setup

### 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

### 2. Get Your API Keys

In your Clerk Dashboard:

1. Go to **API Keys** in the sidebar
2. Copy your keys

### 3. Add Environment Variables

Create a `.env.local` file in the root of your project:

```env
# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk URLs (optional - customize if needed)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_notes?schema=public"
```

### 4. Start Your Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and test the Sign In / Sign Up buttons!

---

## ✅ What's Already Configured

### Middleware (`src/middleware.ts`)

- ✅ Using `clerkMiddleware()` from `@clerk/nextjs/server`
- ✅ Protects all routes by default
- ✅ Excludes static files and Next.js internals

### Layout (`src/app/layout.tsx`)

- ✅ Wrapped with `<ClerkProvider>`
- ✅ Ready for authentication

### Navbar (`src/components/landing/Navbar.tsx`)

- ✅ `<SignInButton>` and `<SignUpButton>` for logged-out users
- ✅ `<UserButton>` for logged-in users
- ✅ Modal mode for seamless UX

### Hero (`src/components/landing/Hero.tsx`)

- ✅ Dynamic CTA based on auth state
- ✅ "Start Taking Notes" for logged-out users
- ✅ "Go to Dashboard" for logged-in users

### Auth Utilities (`src/lib/auth.ts`)

- ✅ `getCurrentAuth()` - Get auth data
- ✅ `getCurrentUser()` - Get full user profile
- ✅ `getCurrentUserId()` - Get user ID
- ✅ `requireAuth()` - Require authentication

---

## 🔐 Using Authentication in Your App

### In Server Components

```typescript
import { getCurrentUserId } from '@/lib/auth'

export default async function DashboardPage() {
	const userId = await getCurrentUserId()

	if (!userId) {
		return <div>Not authenticated</div>
	}

	return <div>Welcome, {userId}!</div>
}
```

### In Server Actions

```typescript
'use server'

import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function createNote(title: string, content: string) {
	const userId = await requireAuth()

	return await prisma.note.create({
		data: {
			title,
			content,
			userId,
		},
	})
}
```

### In API Routes

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
	const { userId } = await auth()

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	return NextResponse.json({ userId })
}
```

### In Client Components

```typescript
'use client'

import { useUser } from '@clerk/nextjs'

export function ProfileComponent() {
	const { user, isLoaded, isSignedIn } = useUser()

	if (!isLoaded) return <div>Loading...</div>
	if (!isSignedIn) return <div>Not signed in</div>

	return <div>Hello, {user.firstName}!</div>
}
```

---

## 🗄️ Database Integration

The User model in Prisma uses Clerk's user ID as the primary key:

```prisma
model User {
  id        String   @id // Clerk user ID (no @default)
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  notes     Note[]
}
```

### Syncing Users

You can create users in your database when they sign up using Clerk webhooks or on-demand:

```typescript
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function syncUser() {
	const clerkUser = await currentUser()

	if (!clerkUser) return null

	// Create or update user in database
	const user = await prisma.user.upsert({
		where: { id: clerkUser.id },
		update: {
			email: clerkUser.emailAddresses[0].emailAddress,
			name: clerkUser.firstName + ' ' + clerkUser.lastName,
		},
		create: {
			id: clerkUser.id,
			email: clerkUser.emailAddresses[0].emailAddress,
			name: clerkUser.firstName + ' ' + clerkUser.lastName,
		},
	})

	return user
}
```

---

## 🎨 Customization

### Customize Sign-In/Sign-Up Pages

Create custom pages at:

- `src/app/sign-in/[[...sign-in]]/page.tsx`
- `src/app/sign-up/[[...sign-up]]/page.tsx`

```typescript
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<SignIn />
		</div>
	)
}
```

### Protect Specific Routes

Update `src/middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/notes(.*)'])

export default clerkMiddleware(async (auth, req) => {
	if (isProtectedRoute(req)) await auth.protect()
})
```

---

## 📚 Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js App Router Guide](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [Clerk Hooks](https://clerk.com/docs/references/react/use-user)
