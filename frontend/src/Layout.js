import React from 'react';
import classes from  './Layout.module.css';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';

function Layout( {Component}) {

  return (
    <>
      <Header/>
      <div className={classes.AppContainer}>
        <Sidebar/>
        <div className={classes.AppContent}>
          {Component}
        </div>
      </div>
    </>
  );
}

export default Layout;
