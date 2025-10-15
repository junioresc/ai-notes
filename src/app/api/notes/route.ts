import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all notes for the authenticated user
export async function GET() {
	try {
		const { userId } = await auth()

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const notes = await prisma.note.findMany({
			where: { userId },
			orderBy: { updatedAt: 'desc' },
		})

		return NextResponse.json(notes)
	} catch (error) {
		console.error('Error fetching notes:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch notes' },
			{ status: 500 }
		)
	}
}

// POST create a new note
export async function POST(request: Request) {
	try {
		const { userId } = await auth()

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.json()
		const { title, content } = body

		if (!title || !content) {
			return NextResponse.json(
				{ error: 'Title and content are required' },
				{ status: 400 }
			)
		}

		const note = await prisma.note.create({
			data: {
				title,
				content,
				userId,
			},
		})

		return NextResponse.json(note, { status: 201 })
	} catch (error) {
		console.error('Error creating note:', error)
		return NextResponse.json(
			{ error: 'Failed to create note' },
			{ status: 500 }
		)
	}
}
