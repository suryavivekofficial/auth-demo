import type { RequestEvent } from '@sveltejs/kit/types/internal';
import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export const get: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			message: 'helo'
		}
	};
};

export const post = async (event) => {
	const data = await event.request.json();
	console.log(data);
	return {
		status: 200,
		body: {
			message: 'data recieved',
			data
		}
	};
};
