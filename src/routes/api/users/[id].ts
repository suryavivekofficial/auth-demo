import { prisma } from '$lib/utils/prisma';

export const get = async (request) => {
	const id = request.params.id;
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	});

	if (user) {
		return {
			status: 200,
			body: { user }
		};
	}
	return {
		status: 404,
		body: {
			message: 'User not found'
		}
	};
};
