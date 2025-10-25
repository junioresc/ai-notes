'use client'

import Link from 'next/link'
import { Brain, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
	return (
		<footer className='border-t bg-background'>
			<div className='container py-12 md:py-16'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
					{/* Brand */}
					<div className='space-y-4'>
						<Link
							href='/'
							className='flex items-center gap-2 font-bold text-xl'
						>
							<Brain className='h-6 w-6' />
							<span>AI Notes</span>
						</Link>
						<p className='text-sm text-muted-foreground'>
							Transform the way you think and capture ideas with AI-powered
							note-taking.
						</p>
						<div className='flex gap-4'>
							<Link
								href='https://twitter.com'
								className='text-muted-foreground hover:text-foreground transition-colors'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Twitter className='h-5 w-5' />
							</Link>
							<Link
								href='https://github.com'
								className='text-muted-foreground hover:text-foreground transition-colors'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Github className='h-5 w-5' />
							</Link>
							<Link
								href='https://linkedin.com'
								className='text-muted-foreground hover:text-foreground transition-colors'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Linkedin className='h-5 w-5' />
							</Link>
						</div>
					</div>

					{/* Product */}
					<div>
						<h3 className='font-semibold mb-4'>Product</h3>
						<ul className='space-y-3 text-sm'>
							<li>
								<Link
									href='#features'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									href='#pricing'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Roadmap
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Changelog
								</Link>
							</li>
						</ul>
					</div>

					{/* Company */}
					<div>
						<h3 className='font-semibold mb-4'>Company</h3>
						<ul className='space-y-3 text-sm'>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h3 className='font-semibold mb-4'>Legal</h3>
						<ul className='space-y-3 text-sm'>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Cookie Policy
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground transition-colors'
								>
									Security
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className='pt-8 border-t text-center text-sm text-muted-foreground'>
					<p>
						&copy; {new Date().getFullYear()} AI Notes. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
