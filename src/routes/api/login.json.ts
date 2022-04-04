import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const { sign } = jwt;
const prisma = new PrismaClient();

export const post: RequestHandler = async (event) => {
	const body = await event.request.json();
	try {
		const user = await prisma.user.findUnique({
			where: {
				name: body.id
			}
		});
		if (user === null) {
			return {
				status: 200,
				body: {
					userFound: false,
					message: 'user not found'
				}
			};
		}
		if (user.password !== body.password) {
			return {
				status: 200,
				body: {
					userFound: true,
					message: 'Incorrect password'
				}
			};
		}
		const secret = process.env.TOKEN_SECRET;
		const token = jwt.sign({ id: user.id }, secret);

		return {
			status: 200,
			body: {
				userFound: true,
				authToken: token,
				secret,
				message: 'user found',
				user
			}
		};
	} catch (err) {
		console.error(err);
	}
};
