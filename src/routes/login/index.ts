import type { RequestHandler } from '@sveltejs/kit';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

let item: { username: string; password: string };

async function writeData(item: { username: string; password: string }) {
	const newUser = await prisma.user.create({
		data: {
			name: item.username,
			password: item.password
		}
	});
}

export const get: RequestHandler = () => {
	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {}
	};
};

export async function post({ request }) {
	const form = await request.formData();
	const username = form.get('user-id');
	const password = form.get('user-password');
	item = {
		username: username,
		password: password
	};
	writeData(item);
	return {
		status: 303,
		headers: {
			location: '/login'
		}
	};
}
