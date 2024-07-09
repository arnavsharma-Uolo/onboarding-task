import { BACKEND_URL } from './constants';

function HealthCheck() {
	return new Promise(async (resolve, reject) => {
		const requestOptions = {
			method: 'GET',
			credentials: 'include',
		};

		try {
			const response = await fetch(`${BACKEND_URL}/health`, requestOptions);
			const result = await response.json();

			if (result.success === false) {
				throw new Error(result.message);
			}

			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
}

export default HealthCheck;
