export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILED = 'CREATE_CATEGORY_FAILED';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';

export function creatingCategory() {
	return {
		type: CREATE_CATEGORY,
	};
}

export function createCatgoryFailed(error) {
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
	return dispatch => {
		dispatch(createCategorySuccess(category));
	};
}
