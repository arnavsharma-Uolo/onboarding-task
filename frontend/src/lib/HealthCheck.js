function HealthCheck() {
	return new Promise(async (resolve, reject) => {
		const requestOptions = {
			method: 'GET',
		};

		try {
			const response = await fetch(
				`http://localhost:8000/api/health`,
				requestOptions,
			);
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
