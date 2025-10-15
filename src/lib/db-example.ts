/**
 * Example usage of Prisma Client
 * This file shows how to interact with the database
 */

import { prisma } from './prisma'

// Example: Create a new user
export async function createUser(email: string, name?: string) {
	return await prisma.user.create({
		data: {
			email,
			name,
		},
	})
}

// Example: Get user by email
export async function getUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: { email },
		include: { notes: true },
	})
}

// Example: Create a note for a user
export async function createNote(
	userId: string,
	title: string,
	content: string
) {
	return await prisma.note.create({
		data: {
			title,
			content,
			userId,
		},
	})
}

// Example: Get all notes for a user
export async function getUserNotes(userId: string) {
	return await prisma.note.findMany({
		where: { userId },
		orderBy: { updatedAt: 'desc' },
	})
}

// Example: Update a note
export async function updateNote(
	noteId: string,
	data: { title?: string; content?: string }
) {
	return await prisma.note.update({
		where: { id: noteId },
		data,
	})
}

// Example: Delete a note
export async function deleteNote(noteId: string) {
	return await prisma.note.delete({
		where: { id: noteId },
	})
}
