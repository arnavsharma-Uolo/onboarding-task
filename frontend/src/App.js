import React from 'react';
import classes from  './App.module.css';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import ShowUser from './pages/showUsers/ShowUser';

function App() {

  return (
    <div className={classes.App}>
      <Header/>
      <div className={classes.AppContainer}>
        <Sidebar/>
        <div className={classes.AppContent}>
          <ShowUser />
        </div>
      </div>
    </div>
  );
}

export default App;
