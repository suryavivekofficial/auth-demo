import { prisma } from '$lib/utils/prisma';
import bcrypt from 'bcryptjs';

export const get = async () => {
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

export const post = async ({ request }) => {
	const body = await request.json();

	const hashedPassword = await bcrypt.hash(body.password, 10);

	// const validPass = await bcrypt.compare(body.password, hashedPassword);
	try {
		const user = await prisma.user.create({
			data: {
				name: body.fullName,
				username: body.username.toLowerCase(),
				role: body.role,
				password: {
					create: {
						password: hashedPassword
					}
				}
			}
		});
		return {
			status: 200,
			body: {
				success: true,
				user
			}
		};
	} catch (error) {
		console.error(error);
		return {
			status: 400,
			body: {
				success: false
			}
		};
	}
};
