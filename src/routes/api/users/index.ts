import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import bcrypt from 'bcryptjs';

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
	//Getting Form data
	const form = await request.formData();
	const rollNo = form.get('rollNo');
	const name = form.get('name');
	const userPassword = form.get('password');
	const role = form.get('role');

	// Hashing password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(userPassword, salt);

	try {
		const newUser = await prisma.user.create({
			data: {
				rollNo,
				name,
				role,
				password: {
					create: {
						hashedPassword
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
