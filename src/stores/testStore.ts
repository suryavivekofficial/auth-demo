import { writable } from 'svelte/store';
export const questions = writable([]);
export const branch = writable('All');
export const year = writable('All');

export const addQues = (question) => {
	questions.update((cur) => [...cur, question]);
};
