import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const { verify } = jwt;

export const handle = ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');

	if (cookies.authToken) {
		const verified = jwt.verify(cookies.authToken, process.env.TOKEN_SECRET);
		if (verified) {
			event.locals.userId = verified.id;
			return resolve(event);
		}
	}

	event.locals.user = null;
	return resolve(event);
};

export const getSession = (event) => {
	return event?.locals?.userId
		? {
				userId: event.locals.userId
		  }
		: {};
};
