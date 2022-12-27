import { writable } from "svelte/store";

export const selectedChar = writable(null);
export const selectedTranscript = writable("Michael");
