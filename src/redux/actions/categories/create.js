import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILED = 'CREATE_CATEGORY_FAILED';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';

export function creatingCategory() {
	return {
		type: CREATE_CATEGORY,
	};
}

export function createCategoryFailed(error) {
	return {
		type: CREATE_CATEGORY_FAILED,
		payload: error,
	};
}

export function createCategorySuccess(category) {
	return {
		type: CREATE_CATEGORY_SUCCESS,
		payload: category,
	};
}

export function createCategory(category) {
	// console.log('createCategory():', category);
	return async (dispatch, getState) => {
		try {
			const userId = getState().userData.userId;
			const result = await ASM.addCategory(category, userId);
			if (result.status) {
				dispatch(createCategorySuccess(category));
			} else {
				dispatch(createCategoryFailed(result.msg));
			}
			return result;
		} catch (e) {
			dispatch(createCategoryFailed(e.message));
		}
	};
}
