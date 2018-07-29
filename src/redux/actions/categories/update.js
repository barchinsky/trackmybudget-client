// import * as api from '@api/category';
import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILED = 'UPDATE_CATEGORY_FAILED';

export function updateCategorySuccess(category) {
	return {
		type: UPDATE_CATEGORY_SUCCESS,
		payload: category,
	};
}

export function updateCategoryFailed(error) {
	return {
		type: UPDATE_CATEGORY_FAILED,
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
export function updateCategory(category) {
	return async dispatch => {
		try {
			// do request to data AsyncStorageManager
			await ASM.updateCategory(category);
			dispatch(updateCategorySuccess(category));
		} catch (e) {
			// console.log('redux.updateCategory():', e.message);
			dispatch(updateCategoryFailed(e.message));
		}
	};
}
