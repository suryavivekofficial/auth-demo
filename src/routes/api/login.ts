import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const { sign } = jwt;
const prisma = new PrismaClient();

export const post: RequestHandler = async (event) => {
	const body = await event.request.json();
	try {
		const { id } = await prisma.user.findUnique({
			where: {
				rollNo: body.id
			}
		});
		const { hashedPassword } = await prisma.passwords.findUnique({
			where: {
				user_id: id
			}
		})
		console.log(id)
		console.log(hashedPassword)
		if (!id) {
			return {
				status: 404,
				body: {
					ok: false,
					message: 'User not found'
				}
			};
		}
		if (hashedPassword !== body.password) {
			return {
				status: 404,
				body: {
					ok: false,
					message: 'Incorrect password'
				}
			};
		}
		const secret = process.env.TOKEN_SECRET;
		const token = jwt.sign({ id }, secret);

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
				authToken: token,
				message: 'user found',
				id
			}
		};
	} catch (err) {
		console.error(err);
	}
};
