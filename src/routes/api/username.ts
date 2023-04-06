import { prisma } from '$lib/utils/prisma';

export const get = async ({ url }) => {
	console.log(url.searchParams.get('username'));

	const usernameFromClient = url.searchParams.get('username');

	const user = await prisma.user.findUnique({
		where: {
			username: usernameFromClient
		}
	});

	if (user) {
		return {
			status: 200,
			headers: {
				location: '/'
			},
			body: {
				isUsernameAvailable: false
			}
		};
	}
	return {
		status: 200,
		headers: {
			location: '/'
		},
		body: {
			isUsernameAvailable: true
		}
	};
};
