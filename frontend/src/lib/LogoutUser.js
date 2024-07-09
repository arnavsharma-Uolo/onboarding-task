import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { BACKEND_URL } from './constants';

export const logoutUser = async (e) => {
	try {
		const requestOptions = {
			method: 'POST',
		};

		const response = await fetch(
			`${BACKEND_URL}/v1/auth/logout`,
			requestOptions,
		);
		const result = await response.json();

		if (!result.success) {
			toast.error(result.error);
			throw new Error(result.message);
		}
	} catch (error) {
		console.error(error);
	} finally {
		Cookies.remove('accessToken');
		Cookies.remove('refreshToken');
		
		window.location.reload();
	}
};
