import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const { verify } = jwt;
const prisma = new PrismaClient();

export const post: RequestHandler = async (event) => {
	const token = await event.request.json();
	const secret = process.env.TOKEN_SECRET;
	const verified = jwt.verify(token, secret)

	try{
		const user = await prisma.user.findUnique({
			where : {
				id: verified.id
			}
		})
		return {
			body: {
				message: "hello world",
				verified,
				user
			}
		}
	} catch(error) {
		console.error(error.message)
	}

}