import styled from 'styled-components';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
	display: flex;
	flex: 1;
	background: #f3f3f3;
`;

const AppContent = styled.div`
	flex: 1;
	position: ${(props) => (props.sidebarOpen ? 'fixed' : 'inherit')};
	overflow-y: auto;
`;

function Layout({ user, Component }) {
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) navigate('/login');
	});

	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<>
			<Header
				user={user}
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>
			{user && (
				<AppContainer>
					<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<AppContent sidebarOpen={sidebarOpen}>{Component}</AppContent>
				</AppContainer>
			)}
		</>
	);
}

export default Layout;
