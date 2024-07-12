import styled from 'styled-components';
import AddUser from './pages/addUser/AddUser';
import HealthCheck from './lib/services/HealthCheck';
import LoginPage from './pages/loginPage/LoginPage';
import Layout from './Layout';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ServerError from './pages/serverError/ServerError';
import ShowUser from './pages/showUsers/ShowUser';
import ValidateLogin from './lib/services/LoginCheck';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const AppContainer = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
`;

function App() {
	const [isHealthCheckComplete, setHealthCheckComplete] = useState(false);
	const [healthCheckFailed, setHealthCheckFailed] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const checkHealth = async () => {
			try {
				await HealthCheck();
				setHealthCheckComplete(true);
			} catch (error) {
				setHealthCheckFailed(true);
			}
		};

		checkHealth();
	}, []);

	useEffect(() => {
		const checkLogin = async () => {
			try {
				if (isHealthCheckComplete) setUser(await ValidateLogin());
			} catch (error) {
				console.error(error);
			}
		};

		checkLogin();
	}, [isHealthCheckComplete]);

	return (
		<AppContainer>
			<BrowserRouter>
				{healthCheckFailed ? (
					<Routes>
						<Route path='*' element={<ServerError />} />
					</Routes>
				) : isHealthCheckComplete ? (
					<Routes>
						<Route path='/login' element={<LoginPage setUser={setUser} />} />
						<Route
							path='/'
							element={<Layout user={user} Component={<ShowUser />} />}
						/>
						<Route
							path='/create-profile'
							element={<Layout user={user} Component={<AddUser />} />}
						/>
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				) : (
					<div>Checking server health...</div>
				)}
			</BrowserRouter>
			<Toaster position='top-right' reverseOrder={false} />
		</AppContainer>
	);
}

export default App;
