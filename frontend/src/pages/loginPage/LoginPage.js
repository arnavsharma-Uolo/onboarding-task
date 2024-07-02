import classes from './LoginPage.module.css';
import { ReactComponent as Image } from '../../assets/login.svg';
import { ReactComponent as Logo } from '../../assets/logo.svg';


function LoginPage() {
  return (
    <div className={classes.LoginPageContainer}>
      <div className={classes.ImageContainer}>
        <Image className={classes.Image}/>
      </div>
      <div className={classes.FormContainer}>
        <Logo />
        <div className={classes.FormContent}>
            <p className={classes.FormContentText}>Welcome Back!</p>
            <p className={classes.FormContentSubText}>Log in to continue and access all the features</p>
        </div>
        <form className={classes.Form}>
          <div className={classes.FormInput}>
            <label>Enter Email</label>
            <input type="email" placeholder="Email" />
          </div>
          <div className={classes.FormInput}>
            <label>Enter Password</label>
            <input type="password" placeholder="*******" />
          </div>
          <button type="submit" className={classes.FormButton}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
