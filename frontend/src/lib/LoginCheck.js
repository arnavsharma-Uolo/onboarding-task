import { BACKEND_URL } from './constants';
import Cookies from 'js-cookie';

function ValidateLogin() {
	return new Promise(async (resolve, reject) => {
		const requestOptions = {
			method: 'POST',
			credentials: 'include',
		};

		try {
			const response = await fetch(
				`${BACKEND_URL}/v1/auth/validate`,
				requestOptions,
			);
			const result = await response.json();

			if (result.success === false) {
				throw new Error(result.message);
			}

			Cookies.set('accessToken', result.data.access_token);
			Cookies.set('refreshToken', result.data.refresh_token);

			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
}

export default ValidateLogin;
