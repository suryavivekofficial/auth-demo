import type { RequestHandler } from '@sveltejs/kit';
import prisma from "../../lib/prisma"

export async function get() {
	const users = await prisma.user.findMany();

	if (users) {
		console.log(users);
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
