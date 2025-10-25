'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Brain, Zap, Lock, Search, Sparkles, FileText } from 'lucide-react'

const features = [
	{
		icon: Brain,
		title: 'AI-Powered Intelligence',
		description:
			'Smart suggestions and auto-completion that learns from your writing patterns and helps you articulate ideas faster.',
	},
	{
		icon: Search,
		title: 'Semantic Search',
		description:
			'Find exactly what you need with AI-powered search that understands context and meaning, not just keywords.',
	},
	{
		icon: Sparkles,
		title: 'Auto-Organization',
		description:
			'Let AI automatically categorize, tag, and link related notes so you can focus on thinking, not organizing.',
	},
	{
		icon: FileText,
		title: 'Smart Summaries',
		description:
			'Instantly generate concise summaries of long notes or meetings. Perfect for quick reviews and sharing.',
	},
	{
		icon: Zap,
		title: 'Lightning Fast',
		description:
			'Built for speed with instant sync across all devices. Your notes are always ready when inspiration strikes.',
	},
	{
		icon: Lock,
		title: 'Privacy First',
		description:
			'End-to-end encryption ensures your thoughts remain private. Your data belongs to you, always.',
	},
]

export function Features() {
	return (
		<section id='features' className='py-16 md:py-24'>
			<div className='container'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-4'>
						Everything you need to think better
					</h2>
					<p className='text-lg text-muted-foreground'>
						Powerful features designed to enhance your note-taking experience
						and help you unlock your full potential.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{features.map((feature, index) => {
						const Icon = feature.icon
						return (
							<Card
								key={index}
								className='border-2 hover:border-primary/50 transition-colors'
							>
								<CardHeader>
									<div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4'>
										<Icon className='h-6 w-6 text-primary' />
									</div>
									<CardTitle className='text-xl'>{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className='text-base'>
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</section>
	)
}
