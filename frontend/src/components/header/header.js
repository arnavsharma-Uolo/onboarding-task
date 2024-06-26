import classes from  './header.module.css';
import logo from '../../assets/logo.svg';
import Profile from '../profile/profile';

function Header () {
  return (
    <header className={classes.Header}>
      <div className={classes.HeaderContent}>
        <img src={logo} className="Logo" alt="Logo" />
        <Profile />
      </div>
    </header>
  );
}

export default Header;
