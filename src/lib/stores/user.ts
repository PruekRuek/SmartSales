import { writable } from 'svelte/store';

export const Name = writable<string | null>(null);
export const email = writable<string | null>(null);