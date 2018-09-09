export const SYNC_REQUIRED = 'SYNC_REQUIRED';
export const SYNC_DONE = 'SYNC_DONE';

export function sync() {
	return {
		type: SYNC_REQUIRED,
	};
}

export function syncDone() {
	return {
		type: SYNC_DONE,
	};
}
