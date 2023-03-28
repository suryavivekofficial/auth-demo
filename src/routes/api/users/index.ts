import { prisma } from '$lib/utils/prisma';
import { Prisma } from '@prisma/client';
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

	try {
		console.log('creating user');
		const user = await prisma.user.create({
			data: {
				name: body.fullName,
				role: body.role,
				username: body.username,
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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return {
					status: 500,
					body: {
						success: false,
						errorCode: error.code,
						errorMessage: error.message,
						errorMeta: error.meta,
						errorName: error.name
					}
				};
			}
		}
		return {
			status: 500,
			body: {
				success: false,
				errorCode: error.code,
				errorMessage: error.message,
				errorMeta: error.meta,
				errorName: error.name
			}
		};
	}
};
