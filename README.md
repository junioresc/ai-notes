# AI Notes

An AI-powered note-taking application built with Next.js, Clerk authentication, Prisma, and PostgreSQL. Features a beautiful landing page and a fully functional notes dashboard with complete CRUD operations.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL installed
- [Clerk account](https://clerk.com) (free tier available)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# Create .env.local in the root directory
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL="postgresql://username:password@localhost:5432/ai_notes?schema=public"

# 3. Set up database
npm run db:push

# 4. Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) → Sign in → Go to `/dashboard`

---

## 📁 Project Structure

```
ai-notes/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── notes/
│   │   │       ├── route.ts              # GET all, POST create
│   │   │       └── [id]/
│   │   │           └── route.ts          # GET, PATCH, DELETE single
│   │   ├── dashboard/
│   │   │   ├── layout.tsx                # Dashboard layout
│   │   │   └── page.tsx                  # Main dashboard
│   │   ├── layout.tsx                    # Root layout (ClerkProvider)
│   │   ├── page.tsx                      # Landing page
│   │   └── globals.css                   # Global styles
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardNav.tsx          # Dashboard navbar
│   │   │   ├── NoteCard.tsx              # Note card component
│   │   │   ├── NoteDialog.tsx            # Create/Edit dialog
│   │   │   ├── DeleteConfirmDialog.tsx   # Delete confirmation
│   │   │   └── index.ts
│   │   ├── landing/
│   │   │   ├── Navbar.tsx                # Landing navbar
│   │   │   ├── Hero.tsx                  # Hero section
│   │   │   ├── Features.tsx              # Features showcase
│   │   │   ├── FAQ.tsx                   # FAQ section
│   │   │   ├── Footer.tsx                # Footer
│   │   │   └── index.ts
│   │   └── ui/                           # ShadCN components
│   │
│   ├── lib/
│   │   ├── auth.ts                       # Auth utilities
│   │   ├── prisma.ts                     # Prisma client
│   │   ├── sync-user.ts                  # User sync utility
│   │   └── utils.ts                      # cn utility
│   │
│   ├── types/
│   │   └── database.ts                   # Prisma types
│   │
│   └── middleware.ts                     # Clerk middleware
│
├── prisma/
│   └── schema.prisma                     # Database schema
└── package.json
```

---

## 🔌 API Endpoints

### Notes Collection (`/api/notes`)

#### GET `/api/notes`

Fetch all notes for the authenticated user.

**Response:**

```json
[
	{
		"id": "clx...",
		"title": "My Note",
		"content": "Note content...",
		"userId": "user_...",
		"createdAt": "2025-01-15T10:00:00Z",
		"updatedAt": "2025-01-15T10:30:00Z"
	}
]
```

#### POST `/api/notes`

Create a new note.

**Request:**

```json
{
	"title": "My New Note",
	"content": "This is the content..."
}
```

**Response:** Created note object

### Single Note (`/api/notes/[id]`)

#### GET `/api/notes/[id]`

Fetch a single note by ID.

#### PATCH `/api/notes/[id]`

Update a note's title and/or content.

**Request:**

```json
{
	"title": "Updated Title",
	"content": "Updated content..."
}
```

**Response:** Updated note object

#### DELETE `/api/notes/[id]`

Delete a note.

**Response:**

```json
{
	"success": true
}
```

**Security:** All routes require authentication. Users can only access their own notes.

---

## 🧩 Components

### Dashboard Components

#### `<NoteCard>`

Displays a single note with title, content preview, and action buttons.

**Props:**

```typescript
interface NoteCardProps {
	id: string
	title: string
	content: string
	updatedAt: Date
	onEdit: (id: string) => void
	onDelete: (id: string) => void
}
```

**Usage:**

```tsx
<NoteCard
	id={note.id}
	title={note.title}
	content={note.content}
	updatedAt={new Date(note.updatedAt)}
	onEdit={handleEdit}
	onDelete={handleDelete}
/>
```

#### `<NoteDialog>`

Modal dialog for creating or editing notes.

**Props:**

```typescript
interface NoteDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSave: (title: string, content: string) => Promise<void>
	initialTitle?: string
	initialContent?: string
	mode: 'create' | 'edit'
}
```

**Usage:**

```tsx
<NoteDialog
	open={isOpen}
	onOpenChange={setIsOpen}
	onSave={handleSave}
	mode='create'
/>
```

#### `<DeleteConfirmDialog>`

Confirmation dialog before deleting a note.

**Props:**

```typescript
interface DeleteConfirmDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => Promise<void>
	isLoading: boolean
}
```

### Landing Page Components

- `<Navbar>` - Navigation with sign in/up buttons
- `<Hero>` - Hero section with CTA buttons
- `<Features>` - Feature showcase (6 cards)
- `<FAQ>` - FAQ section with accordion
- `<Footer>` - Footer with links

---

## 🗄️ Database

### Schema

```prisma
model User {
  id        String   @id              // Clerk user ID
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  notes     Note[]
}

model Note {
  id        String   @id @default(cuid())
  title     String
  content   String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId])
}
```

### Commands

```bash
npm run db:generate    # Generate Prisma Client
npm run db:push        # Push schema to database
npm run db:migrate     # Create migration
npm run db:studio      # Open Prisma Studio
```

---

## 🎨 Styling

- **Framework**: Tailwind CSS v4
- **Components**: ShadCN UI (New York style)
- **Icons**: Lucide React
- **Colors**: Neutral theme (supports dark mode)
- **Responsive**: Mobile-first approach
  - Mobile (< 768px): 1 column
  - Tablet (768-1024px): 2 columns
  - Desktop (> 1024px): 3 columns

---

## 🔒 Authentication

### Setup

1. Create a Clerk account
2. Get API keys from dashboard
3. Add to `.env.local`

### Usage

**Server-side:**

```typescript
import { auth, currentUser } from '@clerk/nextjs/server'

// Get current user ID
const { userId } = await auth()

// Get full user object
const user = await currentUser()
```

**Client-side:**

```typescript
import { useUser } from '@clerk/nextjs'

function Component() {
	const { user, isLoaded, isSignedIn } = useUser()
	// ...
}
```

**Protect routes:**

```typescript
// In middleware.ts
export default clerkMiddleware()
```

---

## 🚀 Future Enhancements

### Core Features

- [ ] Rich text editor with markdown support
- [ ] Note search and filtering
- [ ] Tags and categories
- [ ] Note sharing
- [ ] Export to PDF/Markdown

### AI Features

- [ ] Auto-summarization
- [ ] Smart suggestions
- [ ] Content generation
- [ ] Semantic search
- [ ] Auto-categorization

### UX Improvements

- [ ] Keyboard shortcuts
- [ ] Drag & drop sorting
- [ ] Favorites/pinning
- [ ] Notes templates
- [ ] Bulk operations

### Performance

- [ ] Pagination for large datasets
- [ ] Optimistic updates
- [ ] Query caching
- [ ] Image upload support

---

## 🛠️ Development

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm start
```

### Lint code

```bash
npm run lint
```

---

## 📝 License

MIT

---

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js, Clerk, and Prisma**
