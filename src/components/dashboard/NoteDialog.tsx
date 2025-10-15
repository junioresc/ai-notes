'use client'

import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface NoteDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSave: (title: string, content: string) => Promise<void>
	initialTitle?: string
	initialContent?: string
	mode: 'create' | 'edit'
}

export function NoteDialog({
	open,
	onOpenChange,
	onSave,
	initialTitle = '',
	initialContent = '',
	mode,
}: NoteDialogProps) {
	const [title, setTitle] = useState(initialTitle)
	const [content, setContent] = useState(initialContent)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setTitle(initialTitle)
		setContent(initialContent)
	}, [initialTitle, initialContent, open])

	const handleSave = async () => {
		if (!title.trim() || !content.trim()) return

		setIsLoading(true)
		try {
			await onSave(title, content)
			onOpenChange(false)
			setTitle('')
			setContent('')
		} catch (error) {
			console.error('Error saving note:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>
						{mode === 'create' ? 'Create New Note' : 'Edit Note'}
					</DialogTitle>
					<DialogDescription>
						{mode === 'create'
							? 'Add a new note to your collection.'
							: 'Make changes to your note.'}
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid gap-2'>
						<Label htmlFor='title'>Title</Label>
						<Input
							id='title'
							placeholder='Enter note title...'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							disabled={isLoading}
						/>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='content'>Content</Label>
						<Textarea
							id='content'
							placeholder='Enter note content...'
							value={content}
							onChange={(e) => setContent(e.target.value)}
							disabled={isLoading}
							rows={10}
							className='resize-none'
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant='outline'
						onClick={() => onOpenChange(false)}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSave}
						disabled={!title.trim() || !content.trim() || isLoading}
					>
						{isLoading ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
