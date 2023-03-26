import { writable } from 'svelte/store';

export type RoleType = 'User' | 'Admin';

export const role = writable<RoleType>('User');
