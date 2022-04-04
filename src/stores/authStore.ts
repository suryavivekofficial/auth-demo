import { writable } from 'svelte/store';
import { browser } from '$app/env';

const jwt = browser && localStorage.getItem('auth-token');

export const token = writable(browser && jwt);

token.subscribe((value) => browser && localStorage.setItem('auth-token', value));
