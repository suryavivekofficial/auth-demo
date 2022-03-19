import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function get() {
	const users = await prisma.user.findMany();

	if (users) {
		return {
			status: 200,
			headers: {
				location: '/'
			},
			body: { users }
		};
	}
	return {
		status: 404
	};
}
