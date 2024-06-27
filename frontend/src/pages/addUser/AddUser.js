import classes from './AddUser.module.css';
import { ReactComponent as Placeholder } from '../../assets/placeholder.svg';
import { ReactComponent as DownloadButton } from '../../assets/download_button.svg';

function AddUser() {
  return (
    <div className={classes.AddUserContainer}>
      <p className={classes.Heading}>Create Profile</p>
      <div className={classes.FormContainer}>
        <div className={classes.FieldsContainer}>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Upload Photo<span>*</span>
            </div>
            <span className={classes.Subtext}>Upload passport size photo</span>
            <div className={classes.ImageContainer}>
              <Placeholder className={classes.Image} />
              {/* <img className={classes.Image} src="https://via.placeholder.com/150" alt="profile" /> */}
              <DownloadButton className={classes.DownloadButton} />
            </div>
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Name<span>*</span>
            </div>
            <input className={classes.Input} placeholder="Enter Full Name" type="text" />
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Email<span>*</span>
            </div>
            <input className={classes.Input} placeholder="Enter" type="text" />
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Password<span>*</span>
            </div>
            <input className={classes.Input} placeholder="Enter" type="password" />
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Confirm Password<span>*</span>
            </div>
            <input className={classes.Input} placeholder="Enter" type="password" />
          </div>
        </div>
        <div className={classes.ActionContainer}>
          <button className={`${classes.Button} ${classes.CancelButton}`}>Cancel</button>
          <button className={`${classes.Button} ${classes.SaveButton}`}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
