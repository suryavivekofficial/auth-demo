import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export const get: RequestHandler = async () => {
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
};

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const username = form.get('user-id');
	const password = form.get('user-password');
	const role = form.get('user-role');

	try {
		const newUser = await prisma.user.create({
			data: {
				name: username,
				password: password,
				role: role
			}
		});
		return {
			status: 303,
			headers: {
				location: '/'
			},
			body: {
				message: 'data recieved',
				newUser
			}
		};
	} catch (err) {
		console.error(err);
	}
};
