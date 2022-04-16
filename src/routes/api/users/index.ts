import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export const get: RequestHandler = async (request) => {
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
	const rollNo = form.get('rollNo');
	const name = form.get('name');
	const userPassword = form.get('password');
	const role = form.get('role');

	try {
		const newUser = await prisma.user.create({
			data: {
				rollNo,
				name,
				role,
				password: {
					create: {
						hashedPassword: userPassword
					}
				}
			}
		});
		
		return {
			status: 200,
			body: {
				message: 'data recieved',
				userInserted: true
			}
		};
	} catch (err) {
		console.error(err);
	}
};
