'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'

export function Navbar() {
	return (
		<nav className='fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'>
			<div className='container flex h-16 items-center justify-between'>
				<Link href='/' className='flex items-center gap-2 font-bold text-xl'>
					<Brain className='h-6 w-6' />
					<span>AI Notes</span>
				</Link>

				<div className='hidden md:flex items-center gap-6'>
					<Link
						href='#features'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						Features
					</Link>
					<Link
						href='#faq'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						FAQ
					</Link>
					<Link
						href='#pricing'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						Pricing
					</Link>
				</div>

				<div className='flex items-center gap-3'>
					<Button variant='ghost' size='sm'>
						Sign In
					</Button>
					<Button size='sm'>Get Started</Button>
				</div>
			</div>
		</nav>
	)
}
