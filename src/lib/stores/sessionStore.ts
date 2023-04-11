import { writable } from 'svelte/store';
import type { RoleType } from '$lib/stores/roleStore';

export type UserType = {
	id: string;
	name: string;
	role: RoleType;
	username: string;
};

export const user = writable<UserType | null>();

export const loginUser = (userDetails: UserType) => {
	user.set(userDetails);
};

export const logoutUser = () => user.set(null);
