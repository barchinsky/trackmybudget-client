import * as api from '@api/category';

export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILED = 'UPDATE_CATEGORY_FAILED';

export function updateCategorySuccess(category) {
	return {
		type: UPDATE_CATEGORY_SUCCESS,
		payload: category,
	};
}

export function updateCategory(category) {
	return (dispatch, getState) => {
		const { token } = getState().userData;

		return api
			.updateCategory({ token, category })
			.then(response => response.data)
			.then(() => dispatch(updateCategorySuccess(category)))
			.catch(error => {
				throw error;
			});
	};
}
