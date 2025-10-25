'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface NoteCardProps {
	id: string
	title: string
	content: string
	updatedAt: Date
	onEdit: (id: string) => void
	onDelete: (id: string) => void
}

export function NoteCard({
	id,
	title,
	content,
	updatedAt,
	onEdit,
	onDelete,
}: NoteCardProps) {
	return (
		<Card className='hover:border-primary/50 transition-colors'>
			<CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
				<div className='flex-1 space-y-1'>
					<CardTitle className='text-xl line-clamp-1'>{title}</CardTitle>
					<p className='text-xs text-muted-foreground'>
						Updated{' '}
						{formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
					</p>
				</div>
				<div className='flex gap-2'>
					<Button
						variant='ghost'
						size='icon-sm'
						onClick={() => onEdit(id)}
						className='h-8 w-8'
					>
						<Pencil className='h-4 w-4' />
					</Button>
					<Button
						variant='ghost'
						size='icon-sm'
						onClick={() => onDelete(id)}
						className='h-8 w-8 text-destructive hover:text-destructive'
					>
						<Trash2 className='h-4 w-4' />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<p className='text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap'>
					{content}
				</p>
			</CardContent>
		</Card>
	)
}
