import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';
// import 'dotenv/config';
// import jwt from 'jsonwebtoken';

// const { verify } = jwt;
const prisma = new PrismaClient();

export const get: RequestHandler = async (request) => {
	// const secret = process.env.TOKEN_SECRET;
	// const token = request.url.searchParams.get('authToken')

	try {
		// const verified = jwt.verify(token, secret)
		const user = await prisma.user.findUnique({
			where : {
				id: verified.id
			}
		})

		if(!user) {
			return {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				},
				body: {
					access: false,
					message: "User not found"
				}
			}
		}

		return {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				access: true,
				message: "User authenticated",
				verified,
				user
			}
		}
	} catch(error) {
		console.log('Invalid happened')
		console.error(error)
	}
}