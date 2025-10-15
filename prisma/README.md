# Database Setup

## Prerequisites

Make sure you have PostgreSQL installed and running on your machine.

## Setup Instructions

1. **Create a `.env` file in the root directory** with your database connection:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ai_notes?schema=public"
```

Replace `username` and `password` with your PostgreSQL credentials.

2. **Generate Prisma Client:**

```bash
npm run db:generate
```

3. **Push the schema to your database:**

```bash
npm run db:push
```

Or create a migration:

```bash
npm run db:migrate
```

4. **Open Prisma Studio** (optional - to view/edit data):

```bash
npm run db:studio
```

## Schema Overview

### User Model

- `id`: Unique identifier (CUID)
- `email`: Unique email address
- `name`: Optional user name
- `createdAt`: Timestamp of creation
- `updatedAt`: Timestamp of last update
- `notes`: Relation to user's notes

### Note Model

- `id`: Unique identifier (CUID)
- `title`: Note title
- `content`: Note content (Text field)
- `createdAt`: Timestamp of creation
- `updatedAt`: Timestamp of last update
- `userId`: Foreign key to User
- `user`: Relation to the note's owner

## Useful Commands

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database (no migration)
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio GUI
