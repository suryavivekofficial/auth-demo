import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();
const { verify } = jwt;

export const handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');

	if (cookies.authToken) {
		const verified = jwt.verify(cookies.authToken, process.env.TOKEN_SECRET);
		if (verified) {
			const user = await prisma.user.findUnique({
			where: {
				id: verified.id
			}
			});
			event.locals.user = user;
			return resolve(event);
		}
	}

	event.locals.user = null;
	return resolve(event);
};

export const getSession = (event) => {
	return event?.locals?.user
		? {
				user: event.locals.user
		  }
		: {};
};
