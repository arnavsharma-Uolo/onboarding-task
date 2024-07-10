/* eslint-disable no-useless-escape */
import Cookies from 'js-cookie';
import fetch_api from '../../lib/services/api_util';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { encryptionKey } from '../../lib/constants';
import { EncryptText } from '../../lib/services/EncryptText';
import { ReactComponent as ImageSVG } from '../../assets/login.svg';
import { ReactComponent as Logo } from '../../assets/logo_lg.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
		width: 100%;
		height: auto;
	}
	@media screen and (max-width: 928px) {
		display: none;
	}
`;

const FormContainer = styled.div`
	display: flex;
	text-align: left;
	flex-direction: column;
	width: 450px;
	background: #ffffff;
`;

const LogoSVG = styled(Logo)`
	border-bottom: 1px solid #d0d5dd;
	padding-bottom: 20px;
`;

const FormContent = styled.div`
	gap: 10px;
	padding-top: 30px;
	padding-bottom: 40px;
`;

const FormContentText = styled.p`
	padding: 0;
	margin: 0;
	font-family: 'Outfit';
	font-size: 48px;
	font-weight: 700;

	@media screen and (max-width: 768px) {
		font-size: 32px;
	}
`;

const FormContentSubText = styled.p`
	padding: 0;
	margin: 0;
	font-family: 'Open Sans';
	font-size: 0.9rem;
	font-weight: 400;
	color: #3f3f3f;
	@media screen and (max-width: 768px) {
		font-size: 0.8rem;
	}
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
	font-family: 'Open Sans';
	font-size: 0.9rem;
	font-weight: 600;
	text-align: left;

	input {
		border: 1px solid #e4e4e4;
		padding: 12px;
		border-radius: 8px;
		width: 94%;
		margin-top: 5px;
		transition: all 0.3s ease;

		&:focus {
			border: 1px solid #5b35da;
			outline: none;
		}
	}
	@media screen and (max-width: 768px) {
		font-size: 0.8rem;
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
	background-color: #5b35da;
	@media screen and (max-width: 768px) {
		font-size: 12px;
	}
`;

const ErrorMessage = styled.div`
	font-family: 'Open Sans';
	font-size: 0.8rem;
	width: 100%;
	height: 1rem;
	margin: 0;
	text-align: right;
	padding: 0rem 0rem 1rem 0rem;
	color: red;
	visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
	opacity: ${(props) => (props.show ? '1' : '0')};
`;

const Loader = styled.span`
	width: 1rem;
	height: 1rem;
	border: 3px solid #fff;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

function LoginPage({ user, setUser }) {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user) navigate('/');
	}, [user, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setError('Please enter email and password');
			return;
		}
		const emailRegex =
			/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email');
			return;
		}
		setIsLoading(true);

		try {
			const body = {
				email: email,
				password: await EncryptText(password, encryptionKey),
			};

			const response = await loginUser(body);

			if (response.success) {
				handleSuccess(response.data);
			} else {
				setError(response.error);
			}
		} catch (error) {
			toast.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const loginUser = async (body) => {
		return await fetch_api('POST', '/v1/auth/login', body);
	};

	const handleSuccess = (data) => {
		Cookies.set('accessToken', data.access_token);
		Cookies.set('refreshToken', data.refresh_token);
		const user_data = {
			...data,
			expiry: new Date().getTime() + 3600000,
		};
		sessionStorage.setItem('user', JSON.stringify(user_data));
		setUser(data);

		navigate('/');
	};

	return (
		<LoginPageContainer>
			<ImageContainer>
				<ImageSVG className='Image' />
			</ImageContainer>
			<FormContainer>
				<LogoSVG />
				<FormContent>
					<FormContentText>Welcome Back!</FormContentText>
					<FormContentSubText>
						Log in to continue and access all the features
					</FormContentSubText>
				</FormContent>
				<Form>
					<FormInput>
						<label>Enter Email</label>
						<input
							name='email'
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormInput>
					<FormInput>
						<label>Enter Password</label>
						<input
							name='password'
							type='password'
							placeholder='*******'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormInput>
					<ErrorMessage show={error ? 'true' : 'false'}>{error}</ErrorMessage>
					<FormButton type='submit' onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? <Loader /> : 'Login'}
					</FormButton>
				</Form>
			</FormContainer>
		</LoginPageContainer>
	);
}

export default LoginPage;
