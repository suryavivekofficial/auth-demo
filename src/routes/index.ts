import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const get: RequestHandler = () => {
	return {
		status: 200
	};
};

async function showUsers() {
	const users = await prisma.user.findMany();
	console.log('In function call');
	console.log(users);
	console.log('In function call 2');
	return users;
}

const users = showUsers();
