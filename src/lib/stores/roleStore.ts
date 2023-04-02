import { writable } from 'svelte/store';

export type RoleType = 'USER' | 'ADMIN';

export const role = writable<RoleType>('USER');
