import React from 'react';
import classes from  './App.module.css';
import ShowUser from './pages/showUsers/ShowUser';
import AddUser from './pages/addUser/AddUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './pages/loginPage/LoginPage';

function App() {

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout Component={<ShowUser />} />} />
          <Route path="/create-profile" element={<Layout Component={<AddUser />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
