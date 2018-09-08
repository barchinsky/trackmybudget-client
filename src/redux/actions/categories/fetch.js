import * as api from '@api/category';
import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';

export function fetchingCategories() {
	return {
		type: FETCHING_CATEGORIES,
	};
}

export function fetchCategoriesSuccess(categories) {
	return {
		type: FETCH_CATEGORIES_SUCCESS,
		payload: categories,
	};
}

export function fetchCategoriesFailed(error) {
	return {
		type: FETCH_CATEGORIES_FAILED,
		payload: error,
	};
}

// export function fetchCategories() {
// 	return (dispatch, getState) => {
// 		dispatch(fetchingCategories());
// 		const { token } = getState().userData;
// 		return api
// 			.getCategories({ token })
// 			.then(response => {
// 				const { error, data } = response;
// 				if (error) throw new Error(error);
//
// 				dispatch(fetchCategoriesSuccess(data));
// 			})
// 			.catch(error => {
// 				throw error;
// 			});
// 	};
// }

export function fetchCategories() {
	return async (dispatch, getState) => {
		dispatch(fetchingCategories());

		try {
			const userId = getState().userData.userId;
			const categories = await ASM.getCategories(userId);
			dispatch(fetchCategoriesSuccess(categories));
		} catch (e) {
			dispatch(fetchCategoriesFailed(e.message));
		}
	};
}
