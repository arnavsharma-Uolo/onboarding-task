import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ImageSVG } from '../../assets/login.svg';
import { ReactComponent as Logo } from '../../assets/logo_lg.svg';
import { encryptText } from '../../lib/services/encryptText';
import { BACKEND_URL, encryptionKey } from '../../lib/constants';
import { toast } from 'react-toastify';

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
	margin-bottom: 10px;

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

function LoginPage({ user, setUser }) {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user) navigate('/');
	}, [user, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: await encryptText(password, encryptionKey),
				}),
				credentials: 'include',
			};

			const response = await fetch(
				`${BACKEND_URL}/v1/auth/login`,
				requestOptions,
			);
			const result = await response.json();

			if (!result.success) {
				toast.error(result.error);
				return;
			}
			Cookies.set('accessToken', result.data.access_token);
			Cookies.set('refreshToken', result.data.refresh_token);
			setUser(result.data);

			navigate('/');
		} catch (error) {
			toast.error('Server Connection Lost. Try Refreshing the Page');
			console.error(error);
		} finally {
			setIsLoading(false);
		}
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
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormInput>
					<FormInput>
						<label>Enter Password</label>
						<input
							type='password'
							placeholder='*******'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormInput>
					<FormButton type='submit' onClick={handleSubmit} disabled={isLoading}>
						Login
					</FormButton>
				</Form>
			</FormContainer>
		</LoginPageContainer>
	);
}

export default LoginPage;
