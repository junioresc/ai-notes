'use client'

import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Brain } from 'lucide-react'

export function DashboardNav() {
	return (
		<nav className='fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'>
			<div className='container flex h-16 items-center justify-between'>
				<Link
					href='/dashboard'
					className='flex items-center gap-2 font-bold text-xl'
				>
					<Brain className='h-6 w-6' />
					<span>AI Notes</span>
				</Link>

				<div className='flex items-center gap-4'>
					<Link
						href='/'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						Home
					</Link>
					<UserButton />
				</div>
			</div>
		</nav>
	)
}
