# 🚀 Quick Start Guide

Get your AI Notes app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- A Clerk account (free at [clerk.com](https://clerk.com))

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_notes?schema=public"
```

**Get Clerk Keys:**

1. Go to [https://clerk.com](https://clerk.com)
2. Create a new application
3. Copy your keys from the API Keys section

---

## Step 3: Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

---

## Step 4: Start the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Step 5: Test It Out!

1. **Click "Get Started"** on the landing page
2. **Sign up** with your email
3. **Navigate to `/dashboard`**
4. **Create your first note!**

---

## 🎉 You're Done!

Your AI Notes app is now running with:

✅ Beautiful landing page  
✅ Clerk authentication  
✅ Full CRUD dashboard  
✅ PostgreSQL database  
✅ Responsive design

---

## 📚 Next Steps

- Read [DASHBOARD_GUIDE.md](./DASHBOARD_GUIDE.md) for detailed dashboard docs
- Read [CLERK_SETUP.md](./CLERK_SETUP.md) for authentication details
- Check [README.md](./README.md) for full documentation

---

## 🐛 Troubleshooting

### Can't connect to database?

- Make sure PostgreSQL is running
- Check your `DATABASE_URL` is correct
- Try running `npm run db:push` again

### Clerk not working?

- Verify your API keys are correct
- Make sure you're using `.env.local` (not `.env`)
- Restart your dev server after adding keys

### Port 3000 already in use?

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

---

**Need help?** Check the documentation files or open an issue!
