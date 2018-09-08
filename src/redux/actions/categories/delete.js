import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILED = 'DELETE_CATEGORY_FAILED';

export function deleteCategorySuccess(category) {
	return {
		type: DELETE_CATEGORY_SUCCESS,
		payload: category,
	};
}

export function deleteCategoryFailed(error) {
	return {
		type: DELETE_CATEGORY_FAILED,
		payload: error,
	};
}

export function deleteCategory(category) {
	return async (dispatch, getState) => {
		try {
			// do request to data AsyncStorageManager
			const userId = getState().userData.userId;
			const result = await ASM.deleteCategory(category, userId);
			if (result.status) {
				dispatch(deleteCategorySuccess(category));
			} else {
				dispatch(deleteCategoryFailed(result.msg));
			}

			return result;
		} catch (e) {
			console.log('redux.updateCategory():', e.message);
			dispatch(deleteCategoryFailed(e.message));
		}
	};
}
