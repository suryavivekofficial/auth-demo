import { writable } from 'svelte/store';

export const isPopup = writable(false);

export function openPopup() {
	isPopup.set(true);
	setTimeout(() => {
		isPopup.set(false);
	}, 5000);
}
