import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';
const prisma = new PrismaClient();

export const get: RequestHandler = async () => {
	const questions = await prisma.questions.findMany()

	if (questions) {
		return {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			body: { questions }
		};
	}
	return {
		status: 404
	};
}

export const post: RequestHandler = async (event) => {
	let count
	const body = await event.request.json();
	body.forEach(obj => {
		delete obj['id']
		// delete obj['level']
	})
		try {
			const newQues = await prisma.questions.createMany({
				data: body
			})
			count = newQues.count
		} catch (err) {
			console.error(err)
		}

	return {
		status: 200,
		body: {
			message: 'data recieved',
			body,
			count
		}
	};
};
