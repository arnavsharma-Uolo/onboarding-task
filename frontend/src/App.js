import React, { useState, useEffect } from 'react'; // Added useEffect import
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import AddUser from './pages/addUser/AddUser';
import LoginPage from './pages/loginPage/LoginPage';
import Layout from './Layout';
import ShowUser from './pages/showUsers/ShowUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import HealthCheck from './lib/HealthCheck';
import ServerError from './pages/serverError/ServerError';

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

	return (
		<AppContainer>
			<BrowserRouter>
				{healthCheckFailed ? (
					<Routes>
						<Route path='*' element={<ServerError />} />
					</Routes>
				) : isHealthCheckComplete ? (
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/' element={<Layout Component={<ShowUser />} />} />
						<Route
							path='/create-profile'
							element={<Layout Component={<AddUser />} />}
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
