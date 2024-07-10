import Cookies from 'js-cookie';
import fetch_api from './api_util';

async function ValidateLogin() {
	try {
		const user = getUserFromSession();

		if (user) {
			setCookies(user);
			return user;
		}

		let response = {
			success: false,
			message: 'Authorizations Token Not Found',
		};
		if (Cookies.get('accessToken') || Cookies.get('refreshToken'))
			response = await fetch_api('POST', '/v1/auth/validate');

		if (!response.success) {
			throw new Error(response.message);
		}

		setUserInSession(response.data);
		setCookies(response.data);

		return response.data;
	} catch (error) {
		throw error;
	}
}

function getUserFromSession() {
	let user = sessionStorage.getItem('user');
	if (user) {
		user = JSON.parse(user);
		if (user.expiry < new Date().getTime()) {
			return null;
		}
	}
	return user;
}

function setUserInSession(data) {
	const user_data = {
		...data,
		expiry: Date.getTime() + 3600000,
	};
	sessionStorage.setItem('user', JSON.stringify(user_data));
}

function setCookies(user) {
	Cookies.set('accessToken', user.access_token);
	Cookies.set('refreshToken', user.refresh_token);
}

export default ValidateLogin;
