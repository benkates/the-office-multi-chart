import { writable } from "svelte/store";

export const selectedCat = writable(null);
export const selectedTranscript = writable("Michael");
