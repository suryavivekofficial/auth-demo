import { prisma } from '$lib/utils/prisma';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';

export const post = async (event) => {
	const body = await event.request.json();

	try {
		const user = await prisma.user.findUnique({
			where: {
				username: body.username
			}
		});

		if (!user) {
			return {
				status: 403,
				body: {
					success: false,
					message: 'User not found'
				}
			};
		}

		if (user.role !== body.role) {
			return {
				status: 403,
				body: {
					success: false,
					message: 'Wrong role selected'
				}
			};
		}

		const { password } = await prisma.password.findUnique({
			where: {
				userId: user.id
			}
		});

		const validPass = await bcrypt.compare(body.password, password);

		if (!validPass) {
			return {
				status: 403,
				body: {
					success: false,
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
				success: true,
				message: 'user found',
				user
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				success: false,
				message: 'Something went wrong',
				err
			}
		};
	}
};
