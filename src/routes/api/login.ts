import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/utils/prisma';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';

// const { sign } = jwt;
// const prisma = new PrismaClient();

export const post: RequestHandler = async (event) => {
	const body = await event.request.json();
	try {
		const user = await prisma.user.findUnique({
			where: {
				rollNo: body.id
			}
		});

		if (!user) {
			return {
				status: 404,
				body: {
					ok: false,
					message: 'User not found'
				}
			};
		}

		const { hashedPassword } = await prisma.passwords.findUnique({
			where: {
				user_id: user.id
			}
		});

		const validPass = await bcrypt.compare(body.password, hashedPassword);

		if (!validPass) {
			return {
				status: 404,
				body: {
					ok: false,
					message: 'Incorrect password'
				}
			};
		}

		const secret = process.env.TOKEN_SECRET;
		const token = jwt.sign({ id: user.id }, secret);

		return {
			status: 302,
			redirect: '/profile',
			headers: {
				'set-cookie': serialize('authToken', token, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 7
				})
			},
			body: {
				ok: true,
				message: 'user found',
				user
			}
		};
	} catch (err) {
		console.error(err);
	}
};
