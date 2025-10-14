'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
	{
		question: 'How does the AI understand my notes?',
		answer:
			'Our AI uses advanced natural language processing to understand context, relationships, and patterns in your writing. It learns from your style over time to provide increasingly personalized suggestions and insights.',
	},
	{
		question: 'Is my data secure and private?',
		answer:
			'Absolutely. We use end-to-end encryption for all your notes. Your data is encrypted on your device before it reaches our servers, and only you have the keys to decrypt it. We never read or share your notes.',
	},
	{
		question: 'Can I use AI Notes offline?',
		answer:
			"Yes! AI Notes works offline with full functionality. All your notes are stored locally on your device and sync automatically when you're back online. The AI features work offline too.",
	},
	{
		question: 'What makes AI Notes different from other note apps?',
		answer:
			'AI Notes combines the simplicity of traditional note-taking with cutting-edge AI capabilities. Unlike other apps, our AI actively helps you think better by suggesting connections, generating insights, and organizing information intelligently.',
	},
	{
		question: 'How much does it cost?',
		answer:
			'We offer a generous free tier that includes all core features. Premium plans start at $9/month and include unlimited AI generations, advanced search, and priority support. All plans come with a 14-day free trial.',
	},
	{
		question: 'Can I import my existing notes?',
		answer:
			'Yes! We support importing from popular note-taking apps including Notion, Evernote, Apple Notes, and more. You can also import markdown files, PDFs, and plain text documents.',
	},
]

export function FAQ() {
	return (
		<section id='faq' className='py-16 md:py-24 bg-muted/30'>
			<div className='container'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-4'>
						Frequently Asked Questions
					</h2>
					<p className='text-lg text-muted-foreground'>
						Everything you need to know about AI Notes. Can't find what you're
						looking for? Reach out to our support team.
					</p>
				</div>

				<div className='max-w-3xl mx-auto'>
					<Accordion type='single' collapsible className='w-full'>
						{faqs.map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger className='text-left text-lg'>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className='text-base text-muted-foreground'>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	)
}
