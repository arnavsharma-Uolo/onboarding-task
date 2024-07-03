import styled from 'styled-components';
import ModalComponent from '../../components/modal/Modal';
import { ReactComponent as PlaceholderIcon } from '../../assets/placeholder.svg';
import { ReactComponent as DownloadButtonIcon } from '../../assets/download_button.svg';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const AddUserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 25px;
  height: 90vh;
`;

const FormContainer = styled.form`
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 450px;
  background: #FFFFFF;
  border: 1px solid #EAECF0;
  border-radius: 16px;
`;

const FieldsContainer = styled.div`
  padding: 20px;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-top: 1px solid #EAECF0;
`;

const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.15000000596046448px;
  text-align: center;
  cursor: pointer;
  padding: 10px 40px;
  gap: 10px;
  border-radius: 8px;
  border: 1px;
  background: transparent;

  &.CancelButton {
    border: 1px solid #561FE7;
    color: #561FE7;
  }

  &.SaveButton {
    background: #561FE7;
    color: #ffffff;
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

const Heading = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 40.32px;
  letter-spacing: 0.25px;
  text-align: center;
  color: #101828;
`;

const Subtext = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.34px;
  letter-spacing: 0.4000000059604645px;
  text-align: left;
  color: #667085;
`;

const ActionMessage = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.34px;
  letter-spacing: 0.4000000059604645px;
  text-align: right;
  color: red;
  display: ${props => props.show ? 'block' : 'none'};
`;

const InputContainer = styled.div`
  margin: 10px;
`;

const InputText = styled.div`
  padding-bottom: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  color: #344054;

  span {
    color: red;
  }
`;

const Input = styled.input`
  width: 90%;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  padding: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  background: #FFF8E7;
  border-radius: 50%;
  margin: 10px;
  padding: 20px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const Placeholder = styled(PlaceholderIcon)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const DownloadButton = styled(DownloadButtonIcon)`
  padding: 5px;
  width: 30px;
  height: 30px;
  position: absolute;
  margin-right: 10px;
  bottom: 0;
  right: 0;
  background: #ffffff;
  border: 2px solid #E2E2E2;
  border-radius: 50%;
  font-size: large;
`;

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
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
    };
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user`, requestOptions);
      const result = await response.json();
      
      if(result.success === false)
        {
          setApiError(result.error);
          throw new Error(result.message);
        }

      console.log(result);
      emptyFields();
      setIsModalOpen(true);
    } catch (error) {
      toast.error(error.message);
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
    <AddUserContainer>
    <ModalComponent isOpen={isModalOpen} icon={'done'} message="User added successfully!" onClose={closeModal} />
      <Heading>Create Profile</Heading>
      <FormContainer onSubmit={handleSubmit}>
        <FieldsContainer>
          <InputContainer>
            <InputText>
              Upload Photo<span>*</span>
            </InputText>
            <Subtext>Upload passport size photo</Subtext>
            <ImageContainer onClick={triggerFileInputClick}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              {image ? <Image src={imageURL} alt="Uploaded" /> : <Placeholder />}
              <DownloadButton />
            </ImageContainer>
          </InputContainer>
          <InputContainer>
            <InputText>
              Name<span>*</span>
            </InputText>
            <Input
              placeholder="Enter Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputText>
              Email<span>*</span>
            </InputText>
            <Input
              placeholder="Enter"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputText>
              Password<span>*</span>
            </InputText>
            <Input
              placeholder="Enter"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputText>
              Confirm Password<span>*</span>
            </InputText>
            <Input
              placeholder="Enter"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputContainer>
          <ActionMessage show={disabled}>{disabledMessage}</ActionMessage>
          <ActionMessage show={apiError !== ''}>{apiError}</ActionMessage>
        </FieldsContainer>
        <ActionContainer>
          <Button type="button" className="CancelButton" onClick={emptyFields}>Cancel</Button>
          <Button type="submit" className="SaveButton" disabled={disabled} onClick={handleSubmit}>
            Save
          </Button>
        </ActionContainer>
      </FormContainer>
    </AddUserContainer>
  );
}

export default AddUser;
