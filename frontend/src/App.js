import styled from 'styled-components';
import AddUser from './pages/addUser/AddUser';
import LoginPage from './pages/loginPage/LoginPage';
import Layout from './Layout';
import ShowUser from './pages/showUsers/ShowUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout Component={<ShowUser />} />} />
          <Route path="/create-profile" element={<Layout Component={<AddUser />} />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
