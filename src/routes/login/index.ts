import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export const get: RequestHandler = () => {
	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {}
	};
};

export async function post({ request }) {
	const form = await request.formData();
	const username = form.get('user-id');
	const password = form.get('user-password');

	try {
		const newUser = await prisma.user.create({
			data: {
				name: username,
				password: password
			}
		});
		return {
			status: 303,
			headers: {
				location: '/'
			}
		};
	} catch (e) {
		console.error(e);
	}
}
