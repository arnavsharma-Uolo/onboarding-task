import styled from 'styled-components';
import { ReactComponent as ImageSVG } from '../../assets/login.svg';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 100px;
  margin: 25px;
  height: 100%;
`;

const ImageContainer = styled.div`
  .Image {
    border-radius: 18px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 450px;
  background: #FFFFFF;
`;

const FormContent = styled.div`
  gap: 10px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const FormContentText = styled.p`
  padding: 0;
  margin: 0;
  font-family: 'Outfit';
  font-size: 48px;
  font-weight: 700;
  line-height: 60.48px;
  letter-spacing: 0.25px;
`;

const FormContentSubText = styled.p`
  padding: 0;
  margin: 0;
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: 400;
  line-height: 19.07px;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const FormInput = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 25px;

  input {
    border: 1px solid #5B35DA;
    padding: 12px;
    border-radius: 8px;
    width: 94%;
    margin-top: 5px;
  }
`;

const FormButton = styled.button`
  width: 100%;
  font-family: 'Open Sans';
  font-size: 15px;
  font-weight: 600;
  line-height: 20.43px;
  letter-spacing: 0.44999998807907104px;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: 0px;
  background-color: #5B35DA;
`;

function LoginPage() {
  return (
    <LoginPageContainer>
      <ImageContainer>
        <ImageSVG className="Image"/>
      </ImageContainer>
      <FormContainer>
        <LogoSVG />
        <FormContent>
            <FormContentText>Welcome Back!</FormContentText>
            <FormContentSubText>Log in to continue and access all the features</FormContentSubText>
        </FormContent>
        <Form>
          <FormInput>
            <label>Enter Email</label>
            <input type="email" placeholder="Email" />
          </FormInput>
          <FormInput>
            <label>Enter Password</label>
            <input type="password" placeholder="*******" />
          </FormInput>
          <FormButton type="submit">Login</FormButton>
        </Form>
      </FormContainer>
    </LoginPageContainer>
  );
}

export default LoginPage;
