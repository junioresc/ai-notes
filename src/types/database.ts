/**
 * Database types exported from Prisma
 * Use these types throughout your application for type safety
 */

import { Prisma } from '@prisma/client'

// User types
export type User = Prisma.UserGetPayload<{}>
export type UserWithNotes = Prisma.UserGetPayload<{
	include: { notes: true }
}>

// Note types
export type Note = Prisma.NoteGetPayload<{}>
export type NoteWithUser = Prisma.NoteGetPayload<{
	include: { user: true }
}>

// Input types for creating/updating
export type CreateUserInput = Prisma.UserCreateInput
export type UpdateUserInput = Prisma.UserUpdateInput
export type CreateNoteInput = Prisma.NoteCreateInput
export type UpdateNoteInput = Prisma.NoteUpdateInput
