/**
 * Utility to sync Clerk users with your database
 * Call this when a user signs in for the first time
 */

import { currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function syncUserToDatabase() {
	const clerkUser = await currentUser()

	if (!clerkUser) {
		return null
	}

	// Get primary email
	const email = clerkUser.emailAddresses.find(
		(e) => e.id === clerkUser.primaryEmailAddressId
	)?.emailAddress

	if (!email) {
		throw new Error('No email found for user')
	}

	// Upsert user in database
	const user = await prisma.user.upsert({
		where: { id: clerkUser.id },
		update: {
			email,
			name: clerkUser.firstName
				? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim()
				: null,
		},
		create: {
			id: clerkUser.id,
			email,
			name: clerkUser.firstName
				? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim()
				: null,
		},
	})

	return user
}
