import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function get() {
	const users = await prisma.User.findMany();

	if (users) {
		console.log(users)
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
