import { writable } from 'svelte/store';
export const questions = writable([]);
export const levels = writable([]);
export const branch = writable('All');
export const year = writable('All');

export const addQues = (question) => {
	questions.update((cur) => [...cur, question]);
};

export const delQues = id => {
	questions.update(questions => questions.filter(question => question.id !== id))
}