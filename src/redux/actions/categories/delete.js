import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILED = 'DELETE_CATEGORY_FAILED';

export function updateCategorySuccess(category) {
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

// export function updateCategory(category) {
// 	return (dispatch, getState) => {
// 		const { token } = getState().userData;
//
// 		return api
// 			.updateCategory({ token, category })
// 			.then(response => response.data)
// 			.then(() => dispatch(updateCategorySuccess(category)))
// 			.catch(error => {
// 				throw error;
// 			});
// 	};
// }
export function deleteCategory(category) {
	return async dispatch => {
		try {
			// do request to data AsyncStorageManager
			await ASM.deleteCategory(category);
			dispatch(updateCategorySuccess(category));
		} catch (e) {
			console.log('redux.updateCategory():', e.message);
		}
	};
}
