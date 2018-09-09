import { SYNC_DONE, SYNC_REQUIRED } from '@redux/actions/app/app';

const initialState = {
	syncRequired: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
	case SYNC_REQUIRED:
		return { ...state, syncRequired: true };
	case SYNC_DONE:
		return { ...state, syncRequired: false };
	default:
		return state;
	}
}
