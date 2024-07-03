import styled from 'styled-components';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

// Define styled components
const AppContainer = styled.div`
  display: flex;
  flex: 1;
  background: #f3f3f3;
`;

const AppContent = styled.div`
  flex: 1;
`;

function Layout({ Component }) {
  return (
    <>
      <Header />
      <AppContainer>
        <Sidebar />
        <AppContent>
          {Component}
        </AppContent>
      </AppContainer>
    </>
  );
}

export default Layout;
