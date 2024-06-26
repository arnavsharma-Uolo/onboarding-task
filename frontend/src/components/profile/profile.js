import classes from  './profile.module.css';
import profilePic from '../../assets/profilePic.svg';
import { FaAngleDown } from "react-icons/fa";

function Profile () {
  return (
    <div className={classes.Profile}>
      <div className={classes.ProfileContent}>
        <img src={profilePic} alt="profile" />
        <span className={classes.ProfileText}>Arnav</span>
        <FaAngleDown />
      </div>
    </div>
  );
}

export default Profile;
