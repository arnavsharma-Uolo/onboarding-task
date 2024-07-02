import { useEffect, useRef, useState } from 'react';
import classes from './AddUser.module.css';
import { ReactComponent as Placeholder } from '../../assets/placeholder.svg';
import { ReactComponent as DownloadButton } from '../../assets/download_button.svg';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [disabledMessage, setDisabledMessage] = useState("All fields are required");

  useEffect(() => {
    const isFormFilled = name && email && password && confirmPassword && image;
    setDisabled(!isFormFilled || password !== confirmPassword);
    setDisabledMessage(
      !isFormFilled ? "All fields are required" : 
      password !== confirmPassword ? "Passwords do not match" : ""
    );
  }, [name, email, password, confirmPassword, image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('file', image);

    const requestOptions = {
      method: "POST",
      body: formData,
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

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={classes.AddUserContainer}>
      <p className={classes.Heading}>Create Profile</p>
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
        <div className={classes.FieldsContainer}>
          <div className={classes.InputContainer}>
            <div className={classes.InputText}>
              Upload Photo<span>*</span>
            </div>
            <span className={classes.Subtext}>Upload passport size photo</span>
            <div className={classes.ImageContainer} onClick={triggerFileInputClick}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              { image ? <img src={URL.createObjectURL(image)} alt="Placeholder" className={classes.Image} /> : <Placeholder className={classes.Image} /> }
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
          <button type="button" className={`${classes.Button} ${classes.CancelButton}`}>Cancel</button>
          <button type="submit" className={`${classes.Button} ${classes.SaveButton}`} disabled={disabled}  onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
