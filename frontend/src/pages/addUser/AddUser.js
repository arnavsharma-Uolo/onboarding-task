import { useEffect, useRef, useState } from 'react';
import classes from './AddUser.module.css';
import { ReactComponent as Placeholder } from '../../assets/placeholder.svg';
import { ReactComponent as DownloadButton } from '../../assets/download_button.svg';
import Modal from '../../components/model/model';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [disabledMessage, setDisabledMessage] = useState("All fields are required");
  const [apiError, setApiError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let message = '';
    let isFormInvalid = false;

    if (!(name && email && password && confirmPassword && image)) {
      message = "All fields are required";
    } else if (!emailRegex.test(email)) {
      message = "Please enter a valid email address";
    } else if (password !== confirmPassword) {
      message = "Passwords do not match";
    } else if (!passwordRegex.test(password)) {
      message = "Password must be at least 8 characters long, contain at least one letter and one number";
    }

    isFormInvalid = !!message;
    setDisabled(isFormInvalid);
    setDisabledMessage(message);
      
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
        {
          setApiError(result.error);
          throw new Error(response.message);
        }

      console.log(result);
      emptyFields();
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const emptyFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setImage(null);
    setApiError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = '/';
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={classes.AddUserContainer}>
      <Modal isOpen={isModalOpen} icon={'done'} message="User added successfully!" onClose={closeModal} />
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
              { image ? <img src={imageURL} alt="Placeholder" className={classes.Image} /> : <Placeholder className={classes.Image} /> }
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
          <span className={apiError !== '' ? classes.ActionMessageShow : classes.ActionMessageHide}>{apiError}</span>
        </div>
        <div className={classes.ActionContainer}>
          <button type="button" className={`${classes.Button} ${classes.CancelButton}`} onClick={emptyFields} >Cancel</button>
          <button type="submit" className={`${classes.Button} ${classes.SaveButton}`} disabled={disabled} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
