import axios from '@utils/axios';
import Category from '@models/category';

export function getCategories({ token } = {}) {
	const uri = '/categories';

	const headers = { token };

	return axios
		.get(uri, { headers })
		.then(response => response.data)
		.then(responseData => {
			const { status, error, data } = responseData;
			const categories = data.map(rawCat => new Category(rawCat));

			return { status, error, data: categories };
		});
}

export function updateCategory({ token, category }) {
	const uri = '/update/category';

	const headers = { token };
	const body = {
		category: category.id,
		name: category.name,
		color: category.color,
	};

	return axios.post(uri, body, { headers })
		.then(response => response.data);
}
