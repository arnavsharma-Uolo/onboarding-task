import fetch_api from './api_util';

function HealthCheck() {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch_api('GET', '/health');

			if (!response.success) {
				throw new Error(response.message);
			}

			resolve(response);
		} catch (error) {
			reject(error);
		}
	});
}

export default HealthCheck;
