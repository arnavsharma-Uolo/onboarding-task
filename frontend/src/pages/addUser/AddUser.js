import { useEffect, useState } from 'react';
import classes from './AddUser.module.css';
import { ReactComponent as Placeholder } from '../../assets/placeholder.svg';
import { ReactComponent as DownloadButton } from '../../assets/download_button.svg';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [disabledMessage, setDisabledMessage] = useState("All fields are required");

useEffect(() => {
  const isFormFilled = name && email && password && confirmPassword;
  setDisabled(!isFormFilled || password !== confirmPassword);
  setDisabledMessage(
    !isFormFilled ? "All fields are required" : 
    password !== confirmPassword ? "Passwords do not match" : ""
  );
}, [name, email, password, confirmPassword]);

const handleSubmit = async () => {
  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password
    }),
    redirect: "follow"
  };
  
  try {
    const response = await fetch(`http://localhost:8000/api/v1/user`, requestOptions);
    const result = await response.json();
    
    if(result.success === false)
      throw new Error(response.message);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

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
              <DownloadButton className={classes.DownloadButton} />
            </div>
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Name<span>*</span>
            </div>
            <input
              className={classes.Input}
              placeholder="Enter Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Email<span>*</span>
            </div>
            <input
              className={classes.Input}
              placeholder="Enter"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Password<span>*</span>
            </div>
            <input
              className={classes.Input}
              placeholder="Enter"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Confirm Password<span>*</span>
            </div>
            <input
              className={classes.Input}
              placeholder="Enter"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <span className={disabled ? classes.ActionMessageShow : classes.ActionMessageHide}>{disabledMessage}</span>
        </div>
        <div className={classes.ActionContainer}>
          <button className={`${classes.Button} ${classes.CancelButton}`}>Cancel</button>
          <button className={`${classes.Button} ${classes.SaveButton}`} disabled={disabled} onClick={handleSubmit}>
            Save
          </button>
        
        </div>
      </div>
    </div>
  );
}

export default AddUser;
