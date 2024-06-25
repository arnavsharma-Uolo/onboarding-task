import classes from  './header.module.css';
import logo from '../../assets/logo.svg';

function Header () {
  return (
    <header className={classes.Header}>
      <div className={classes.HeaderContent}>
        <img src={logo} className="Logo" alt="Logo" />
        <div>Profile</div>
      </div>
    </header>
  );
}

export default Header;
