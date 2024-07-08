import styled from 'styled-components';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useState } from 'react';

// Define styled components
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

function Layout({ Component }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<>
			<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<AppContainer>
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<AppContent sidebarOpen={sidebarOpen}>{Component}</AppContent>
			</AppContainer>
		</>
	);
}

export default Layout;
