import type { RequestHandler } from '@sveltejs/kit';
let item = {};

export const get: RequestHandler = () => {
	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: { item }
	};
};

export async function post({ request }) {
	const form = await request.formData();
	const username = form.get('user-id');
	const password = form.get('user-password');
	item = {
		username,
		password
	};

	return {
		status: 303,
		headers: {
			location: '/login'
		}
	};
}
