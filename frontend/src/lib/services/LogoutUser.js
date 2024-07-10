import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import fetch_api from './api_util';

export const logoutUser = async (e) => {
	try {
		const response = await fetch_api('POST', '/v1/auth/logout');

		if (!response.success) {
			toast.error(response.error);
			throw new Error(response.message);
		}

	} catch (error) {
		console.error(error);
	} finally {
		Cookies.remove('accessToken');
		Cookies.remove('refreshToken');
		sessionStorage.removeItem('user');
	}
};
