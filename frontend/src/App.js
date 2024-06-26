import React from 'react';
import classes from  './App.module.css';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import ShowUser from './pages/showUsers/ShowUser';
import AddUser from './pages/addUser/AddUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Header/>
        <div className={classes.AppContainer}>
          <Sidebar/>
          <div className={classes.AppContent}>
            <Routes>
              <Route path="/" element={<ShowUser />} />
              <Route path="/create-profile" element={<AddUser />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
