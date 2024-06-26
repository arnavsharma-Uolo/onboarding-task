import classes from  './profile.module.css';
import profilePic from '../../assets/profilePic.svg';

function Profile () {
  return (
    <div className={classes.Profile}>
      <div className={classes.ProfileContent}>
        <img src={profilePic} alt="profile" />
        <span className={classes.ProfileText}>Arnav</span>
      </div>
    </div>
  );
}

export default Profile;
