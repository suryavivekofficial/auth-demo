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
	// console.log(body);

	const hashedPassword = await bcrypt.hash(body.password, 10);
	// console.log(hashedPassword);

	// const validPass = await bcrypt.compare(body.password, hashedPassword);
	// console.log(validPass);
	console.log(body);
	try {
		console.log('creating user');
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
		console.log(user);
		return {
			status: 200,
			body: {
				success: true,
				user
			}
		};
	} catch (error) {
		console.error(error);
	}
};
