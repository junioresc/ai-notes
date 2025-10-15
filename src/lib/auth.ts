/**
 * Server-side authentication utilities using Clerk
 * Use these functions in Server Components, Server Actions, and Route Handlers
 */

import { auth, currentUser } from '@clerk/nextjs/server'

/**
 * Get the current user's ID and session claims
 * Returns null if user is not authenticated
 */
export async function getCurrentAuth() {
	const authData = await auth()
	return authData
}

/**
 * Get the current user's full profile
 * Returns null if user is not authenticated
 */
export async function getCurrentUser() {
	const user = await currentUser()
	return user
}

/**
 * Get the current user's ID
 * Returns null if user is not authenticated
 */
export async function getCurrentUserId() {
	const { userId } = await auth()
	return userId
}

/**
 * Require authentication - throws error if not authenticated
 * Use this in Server Actions or API routes that require auth
 */
export async function requireAuth() {
	const { userId } = await auth()

	if (!userId) {
		throw new Error('Unauthorized')
	}

	return userId
}
