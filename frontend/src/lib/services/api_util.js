import { BACKEND_URL } from '../constants';
import { toast } from 'react-hot-toast';

async function fetch_api(method, url, body = null, headers = {}) {
	try {
		const isFormData = body instanceof FormData;
		const requestOptions = {
			method: method,
			headers: {
				...headers,
				...(isFormData ? {} : { 'Content-Type': 'application/json' }),
			},
			credentials: 'include',
			body: isFormData ? body : body ? JSON.stringify(body) : null,
		};

		const response = await fetch(`${BACKEND_URL + url}`, requestOptions);
		const data = await response.json();

		return data;
	} catch (error) {
		toast.error('Server Connection Lost. Try Refreshing the Page');
		console.log(error);
	}
}

export default fetch_api;
