import { isDev, baseUrlDev, baseUrlProd } from 'trackmybudget/src/config';
import axios from 'axios';

var _axios = null;
if (isDev) {
	_axios = axios.create({
		baseURL: baseUrlDev
	});
} else {
	_axios = axios.create({
		baseURL: baseUrlProd
	});
}

export default _axios;
