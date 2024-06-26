import React, { useState } from 'react';
import classes from './profile.module.css';
import profilePic from '../../assets/profilePic.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout_icon.svg';


function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log('Modal visibility:', isModalOpen);
  };

  return (
    <div className={classes.Profile}>
      <div className={classes.ProfileContent} onClick={toggleModal}>
        <img src={profilePic} alt="profile" />
        <span className={classes.ProfileText}>Arnav</span>
        <span className={classes.ProfileText}>\/</span>
      </div>
      {isModalOpen && (
        <div className={classes.Modal}>
          <LogoutIcon />
          <p>Logout</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
