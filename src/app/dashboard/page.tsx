'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { NoteCard } from '@/components/dashboard/NoteCard'
import { NoteDialog } from '@/components/dashboard/NoteDialog'
import { DeleteConfirmDialog } from '@/components/dashboard/DeleteConfirmDialog'
import { Plus, Loader2 } from 'lucide-react'

interface Note {
	id: string
	title: string
	content: string
	createdAt: string
	updatedAt: string
	userId: string
}

export default function DashboardPage() {
	const router = useRouter()
	const { isLoaded, isSignedIn } = useUser()
	const [notes, setNotes] = useState<Note[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Dialog states
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedNote, setSelectedNote] = useState<Note | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	// Redirect if not signed in
	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push('/')
		}
	}, [isLoaded, isSignedIn, router])

	// Fetch notes
	const fetchNotes = async () => {
		try {
			setIsLoading(true)
			setError(null)
			const response = await fetch('/api/notes')

			if (!response.ok) {
				throw new Error('Failed to fetch notes')
			}

			const data = await response.json()
			setNotes(data)
		} catch (err) {
			console.error('Error fetching notes:', err)
			setError('Failed to load notes')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (isSignedIn) {
			fetchNotes()
		}
	}, [isSignedIn])

	// Create note
	const handleCreateNote = async (title: string, content: string) => {
		const response = await fetch('/api/notes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content }),
		})

		if (!response.ok) {
			throw new Error('Failed to create note')
		}

		await fetchNotes()
	}

	// Update note
	const handleUpdateNote = async (title: string, content: string) => {
		if (!selectedNote) return

		const response = await fetch(`/api/notes/${selectedNote.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content }),
		})

		if (!response.ok) {
			throw new Error('Failed to update note')
		}

		await fetchNotes()
		setSelectedNote(null)
	}

	// Delete note
	const handleDeleteNote = async () => {
		if (!selectedNote) return

		setIsDeleting(true)
		try {
			const response = await fetch(`/api/notes/${selectedNote.id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Failed to delete note')
			}

			await fetchNotes()
			setIsDeleteDialogOpen(false)
			setSelectedNote(null)
		} catch (err) {
			console.error('Error deleting note:', err)
		} finally {
			setIsDeleting(false)
		}
	}

	// Handle edit click
	const handleEditClick = (id: string) => {
		const note = notes.find((n) => n.id === id)
		if (note) {
			setSelectedNote(note)
			setIsEditDialogOpen(true)
		}
	}

	// Handle delete click
	const handleDeleteClick = (id: string) => {
		const note = notes.find((n) => n.id === id)
		if (note) {
			setSelectedNote(note)
			setIsDeleteDialogOpen(true)
		}
	}

	if (!isLoaded || !isSignedIn) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<div className='border-b'>
				<div className='container py-8'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl font-bold tracking-tight'>My Notes</h1>
							<p className='text-muted-foreground mt-1'>
								Manage your AI-powered notes
							</p>
						</div>
						<Button onClick={() => setIsCreateDialogOpen(true)} size='lg'>
							<Plus className='h-4 w-4 mr-2' />
							New Note
						</Button>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className='container py-8'>
				{isLoading ? (
					<div className='flex items-center justify-center py-12'>
						<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
					</div>
				) : error ? (
					<div className='text-center py-12'>
						<p className='text-destructive mb-4'>{error}</p>
						<Button onClick={fetchNotes} variant='outline'>
							Try Again
						</Button>
					</div>
				) : notes.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-muted-foreground mb-4'>
							No notes yet. Create your first note to get started!
						</p>
						<Button onClick={() => setIsCreateDialogOpen(true)}>
							<Plus className='h-4 w-4 mr-2' />
							Create Note
						</Button>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{notes.map((note) => (
							<NoteCard
								key={note.id}
								id={note.id}
								title={note.title}
								content={note.content}
								updatedAt={new Date(note.updatedAt)}
								onEdit={handleEditClick}
								onDelete={handleDeleteClick}
							/>
						))}
					</div>
				)}
			</div>

			{/* Dialogs */}
			<NoteDialog
				open={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
				onSave={handleCreateNote}
				mode='create'
			/>

			<NoteDialog
				open={isEditDialogOpen}
				onOpenChange={(open) => {
					setIsEditDialogOpen(open)
					if (!open) setSelectedNote(null)
				}}
				onSave={handleUpdateNote}
				initialTitle={selectedNote?.title}
				initialContent={selectedNote?.content}
				mode='edit'
			/>

			<DeleteConfirmDialog
				open={isDeleteDialogOpen}
				onOpenChange={(open) => {
					setIsDeleteDialogOpen(open)
					if (!open) setSelectedNote(null)
				}}
				onConfirm={handleDeleteNote}
				isLoading={isDeleting}
			/>
		</div>
	)
}
