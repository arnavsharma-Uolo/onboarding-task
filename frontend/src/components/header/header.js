import classes from  './header.module.css';
import logo from '../../assets/logo.svg';
import Profile from '../profile/profile';
import { Link } from 'react-router-dom';

function Header () {
  return (
    <header className={classes.Header}>
      <div className={classes.HeaderContent}>
        <div className={classes.HeaderHamburger}>|||</div>
        <Link to="/" className={classes.LogoLink}><img src={logo} className="Logo" alt="Logo" /></Link>
        <Profile />
      </div>
    </header>
  );
}

export default Header;
