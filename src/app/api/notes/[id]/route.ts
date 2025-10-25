import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET a single note
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { userId } = await auth()
		const { id } = await params

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const note = await prisma.note.findFirst({
			where: {
				id,
				userId,
			},
		})

		if (!note) {
			return NextResponse.json({ error: 'Note not found' }, { status: 404 })
		}

		return NextResponse.json(note)
	} catch (error) {
		console.error('Error fetching note:', error)
		return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 })
	}
}

// PATCH update a note
export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { userId } = await auth()
		const { id } = await params

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.json()
		const { title, content } = body

		// Verify note belongs to user
		const existingNote = await prisma.note.findFirst({
			where: {
				id,
				userId,
			},
		})

		if (!existingNote) {
			return NextResponse.json({ error: 'Note not found' }, { status: 404 })
		}

		const note = await prisma.note.update({
			where: { id },
			data: {
				...(title !== undefined && { title }),
				...(content !== undefined && { content }),
			},
		})

		return NextResponse.json(note)
	} catch (error) {
		console.error('Error updating note:', error)
		return NextResponse.json(
			{ error: 'Failed to update note' },
			{ status: 500 }
		)
	}
}

// DELETE a note
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { userId } = await auth()
		const { id } = await params

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		// Verify note belongs to user
		const existingNote = await prisma.note.findFirst({
			where: {
				id,
				userId,
			},
		})

		if (!existingNote) {
			return NextResponse.json({ error: 'Note not found' }, { status: 404 })
		}

		await prisma.note.delete({
			where: { id },
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Error deleting note:', error)
		return NextResponse.json(
			{ error: 'Failed to delete note' },
			{ status: 500 }
		)
	}
}
