import React from 'react';
import { Link, useLocation } from "react-router-dom";
import classes from './sidebar.module.css';

function SidebarItem({ link, icon, title }) {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link to={link} className={isActive ? `${classes.SidebarItemContent} ${classes.SidebarItemActive}` : classes.SidebarItemContent}>
      <div className={isActive ? classes.IconActive : ''}>
        {icon}
      </div>
      <div className={classes.SidebarItemText}>
        {title}
      </div>
    </Link>
  );
}

export default SidebarItem;
