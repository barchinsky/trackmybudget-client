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
	return async (dispatch, getState) => {
		try {
			// do request to data AsyncStorageManager
			const userId = getState().userData.userId;
			const result = await ASM.updateCategory(category, userId);
			if (result.status) {
				dispatch(updateCategorySuccess(category));
			} else {
				dispatch(updateCategoryFailed(result.msg));
			}

			return result;
		} catch (e) {
			// console.log('redux.updateCategory():', e.message);
			dispatch(updateCategoryFailed(e.message));
		}
	};
}
