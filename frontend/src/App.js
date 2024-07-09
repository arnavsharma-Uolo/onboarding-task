import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import AddUser from './pages/addUser/AddUser';
import HealthCheck from './lib/HealthCheck';
import LoginPage from './pages/loginPage/LoginPage';
import Layout from './Layout';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ServerError from './pages/serverError/ServerError';
import ShowUser from './pages/showUsers/ShowUser';
import ValidateLogin from './lib/LoginCheck';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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

		const checkLogin = async () => {
			try {
				const response = await ValidateLogin();
				setUser(response.data);
			} catch (error) {
				setUser(null);
			}
		};

		checkHealth();
		checkLogin();
	}, []);

	return (
		<AppContainer>
			<BrowserRouter>
				{healthCheckFailed ? (
					<Routes>
						<Route path='*' element={<ServerError />} />
					</Routes>
				) : isHealthCheckComplete ? (
					<Routes>
						<Route
							path='/login'
							element={<LoginPage user={user} setUser={setUser} />}
						/>
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
			<ToastContainer />
		</AppContainer>
	);
}

export default App;
