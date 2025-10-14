'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
	return (
		<section className='pt-32 pb-16 md:pt-40 md:pb-24'>
			<div className='container'>
				<div className='flex flex-col items-center text-center max-w-4xl mx-auto'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-sm mb-6'>
						<Sparkles className='h-4 w-4' />
						<span>Powered by Advanced AI</span>
					</div>

					<h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6'>
						Your thoughts,
						<br />
						<span className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
							supercharged by AI
						</span>
					</h1>

					<p className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl'>
						Transform the way you capture, organize, and recall information. AI
						Notes learns from your writing style and helps you think better.
					</p>

					<div className='flex flex-col sm:flex-row gap-4'>
						<Button size='lg' className='gap-2'>
							Start Taking Notes
							<ArrowRight className='h-4 w-4' />
						</Button>
						<Button size='lg' variant='outline'>
							Watch Demo
						</Button>
					</div>

					<div className='mt-16 w-full'>
						<div className='relative rounded-xl border bg-card shadow-2xl overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5' />
							<div className='relative aspect-video flex items-center justify-center p-8'>
								<div className='text-muted-foreground'>
									{/* Placeholder for demo image/video */}
									<div className='w-full h-full bg-muted/30 rounded-lg flex items-center justify-center'>
										<p className='text-sm'>App Preview</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
