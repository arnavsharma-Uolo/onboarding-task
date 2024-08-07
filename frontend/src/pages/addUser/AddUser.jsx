/* eslint-disable no-useless-escape */
import styled from 'styled-components';
import fetch_api from '../../lib/services/api_util';
import toast from 'react-hot-toast';
import ModalComponent from '../../components/modal/Modal';
import { encryptionKey } from '../../lib/constants';
import { EncryptText } from '../../lib/services/EncryptText';
import { ReactComponent as DownloadButtonIcon } from '../../assets/download_button.svg';
import { ReactComponent as PlaceholderIcon } from '../../assets/placeholder.svg';
import { ReactComponent as RemoveButtonIcon } from '../../assets/remove_button.svg';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUserContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
	margin: 2rem;
	@media screen and (max-width: 870px) {
		margin: 0;
		padding-top: 2rem;
		justify-content: start;
		background: #ffffff;
	}
`;

const FormContainer = styled.form`
	display: flex;
	text-align: left;
	flex-direction: column;
	width: 28rem;
	background: #ffffff;
	border: 1px solid #eaecf0;
	border-radius: 16px;
	@media screen and (max-width: 870px) {
		width: 80%%;
		border: 0;
	}
	@media screen and (max-width: 425px) {
		width: 100%;
		border: 0;
	}
`;

const FieldsContainer = styled.div`
	padding: 2rem 2rem 0rem 2rem;
`;

const ActionContainer = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	gap: 1rem;
	padding: 1rem 2rem;
	border-top: 1px solid #eaecf0;
`;

const Button = styled.button`
	width: 7rem;
	min-width: fit-content;
	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
	font-weight: 600;
	text-align: center;
	cursor: pointer;
	padding: 0.6rem 2.1rem;
	border-radius: 8px;
	border: 1px;
	background: transparent;

	&.CancelButton {
		border: 1px solid #561fe7;
		color: #561fe7;
	}

	&.SaveButton {
		background: #561fe7;
		color: #ffffff;
	}

	&:disabled {
		background-color: #cccccc;
		color: #ffffff;
		cursor: not-allowed;
	}
`;

const Heading = styled.p`
	margin: 0rem 0rem 1rem 0rem;
	font-family: 'Outfit', sans-serif;
	font-size: 2rem;
	font-weight: 700;
	text-align: center;
	color: #101828;
`;

const Subtext = styled.span`
	font-family: 'Open Sans', sans-serif;
	font-size: 0.7rem;
	font-weight: 400;
	text-align: left;
	color: #667085;
`;
const InputContainer = styled.div`
	position: relative;
	margin-bottom: 1rem;
`;

const InputText = styled.div`
	margin-bottom: 0.5rem;
	font-family: 'Open Sans', sans-serif;
	font-size: 14px;
	font-weight: 600;
	text-align: left;
	color: #344054;

	span {
		color: red;
	}
`;

const ErrorMessage = styled.span`
	position: absolute;
	right: 0;
	font-family: 'Open Sans', sans-serif;
	font-size: 0.7rem;
	font-weight: 400;
	text-align: right;
	color: red;
	visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

const Input = styled.input`
	box-sizing: border-box;
	width: 100%;
	border: 1px solid #d0d5dd;
	border-radius: 8px;
	padding: 1rem;
`;

const ImageContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 8rem;
	height: 8rem;
	border-radius: 50%;
	margin: 1rem 0rem 1rem 0rem;
`;

const Image = styled.img`
	width: 8em;
	height: 8em;
	border-radius: 50%;
`;

const Placeholder = styled(PlaceholderIcon)``;

const DownloadButton = styled(DownloadButtonIcon)`
	padding: 5px;
	width: 1.5rem;
	height: 1.5rem;
	position: absolute;
	bottom: 0;
	right: 0;
	background: #ffffff;
	border: 2px solid #e2e2e2;
	border-radius: 50%;
	font-size: large;
`;

const RemoveButton = styled(RemoveButtonIcon)`
	padding: 5px;
	width: 1.5rem;
	height: 1.5rem;
	position: absolute;
	bottom: 0;
	right: 0;
	background: #ffffff;
	border: 2px solid #e2e2e2;
	border-radius: 50%;
	font-size: large;
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

function AddUser() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		image: null,
	});
	const [formDataError, setFormDataError] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		image: null,
	});
	const [imageURL, setImageURL] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const updateFormData = (e) => {
		const MIN_NAME_LENGTH = 3;
		const MIN_PASSWORD_LENGTH = 5;
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		const emailRegex =
			/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

		if (name === 'name') {
			setFormDataError({
				...formDataError,
				[name]:
					value.length < MIN_NAME_LENGTH || value.trim().length === 0
						? `Name must be at least ${MIN_NAME_LENGTH} characters`
						: '',
			});
		}
		if (name === 'email') {
			setFormDataError({
				...formDataError,
				[name]: !emailRegex.test(value) ? 'Invalid email' : '',
			});
		}
		if (name === 'password') {
			setFormDataError({
				...formDataError,
				[name]:
					value.length < MIN_PASSWORD_LENGTH
						? `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
						: '',
			});
			setFormDataError({
				...formDataError,
				confirmPassword:
					value !== formData.password ? 'Passwords do not match' : '',
			});
		}
		if (name === 'confirmPassword') {
			setFormDataError({
				...formDataError,
				[name]: value !== formData.password ? 'Passwords do not match' : '',
			});
		}
	};

	const fileInputRef = useRef(null);

	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			if (e.target.files[0].size > 5242880) {
				toast.error('File size should be less than 5 MB');
				return;
			}
			setFormData({ ...formData, image: e.target.files[0] });
			setImageURL(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleImageRemove = () => {
		setFormData({ ...formData, image: null });
		setImageURL(null);
	};

	const triggerFileInputClick = () => {
		fileInputRef.current.click();
	};

	useEffect(() => {
		const disable =
			formDataError.name ||
			formDataError.email ||
			formDataError.password ||
			formDataError.confirmPassword ||
			formDataError.image ||
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword ||
			!formData.image ||
			!(formData.password === formData.confirmPassword);
		setDisabled(disable);
	}, [formData, formDataError]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const body = new FormData();
			body.append('name', formData.name.trim());
			body.append('email', formData.email.trim());
			body.append(
				'password',
				await EncryptText(formData.password, encryptionKey),
			);
			body.append('file', formData.image);

			const result = await fetch_api('POST', '/v1/user', body);
			if (result.success === false) {
				toast.error(result.error);
				return;
			}

			emptyFields();
			setIsModalOpen(true);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const emptyFields = () => {
		setFormData({
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			image: null,
		});
		setFormDataError({
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			image: null,
		});
		setImageURL(null);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		navigate('/');
	};

	return (
		<AddUserContainer>
			<ModalComponent
				isOpen={isModalOpen}
				icon={'done'}
				message='User added successfully!'
				onClose={closeModal}
			/>
			<Heading>Create Profile</Heading>
			<FormContainer onSubmit={handleSubmit}>
				<FieldsContainer>
					<InputContainer>
						{!imageURL && (
							<ErrorMessage show={true}>Please select an image</ErrorMessage>
						)}
						<InputText style={{ marginBottom: '0' }}>
							Upload Photo<span>*</span>
						</InputText>
						<Subtext>Upload passport size photo</Subtext>
						<ImageContainer>
							<input
								type='file'
								ref={fileInputRef}
								onChange={handleImageChange}
								accept='image/*'
								style={{ display: 'none' }}
							/>
							{formData.image && imageURL ? (
								<Image
									src={imageURL}
									alt='Uploaded'
									onClick={triggerFileInputClick}
								/>
							) : (
								<Placeholder onClick={triggerFileInputClick} />
							)}

							{!formData.image && !imageURL ? (
								<DownloadButton onClick={triggerFileInputClick} />
							) : (
								<RemoveButton onClick={() => handleImageRemove()} />
							)}
						</ImageContainer>
					</InputContainer>
					<InputContainer>
						<InputText>
							Name
							<span>
								*
								<ErrorMessage show={formDataError.name}>
									{formDataError.name}
								</ErrorMessage>
							</span>
						</InputText>
						<Input
							name='name'
							placeholder='Enter Full Name'
							type='text'
							value={formData.name}
							onChange={updateFormData}
						/>
					</InputContainer>
					<InputContainer>
						<InputText>
							Email-ID
							<span>
								*
								<ErrorMessage show={formDataError.email}>
									{formDataError.email}
								</ErrorMessage>
							</span>
						</InputText>
						<Input
							name='email'
							placeholder='Enter Email'
							type='text'
							value={formData.email}
							onChange={updateFormData}
						/>
					</InputContainer>
					<InputContainer>
						<InputText>
							Password
							<span>
								*
								<ErrorMessage show={formDataError.password}>
									{formDataError.password}
								</ErrorMessage>
							</span>
						</InputText>
						<Input
							name='password'
							placeholder='Enter Password'
							type='password'
							value={formData.password}
							onChange={updateFormData}
						/>
					</InputContainer>
					<InputContainer>
						<InputText>
							Confirm Password
							<span>
								*
								<ErrorMessage show={formDataError.confirmPassword}>
									{formDataError.confirmPassword}
								</ErrorMessage>
							</span>
						</InputText>
						<Input
							name='confirmPassword'
							placeholder='Enter Password Again'
							type='password'
							value={formData.confirmPassword}
							onChange={updateFormData}
						/>
					</InputContainer>
				</FieldsContainer>
				<ActionContainer>
					<Button type='button' className='CancelButton' onClick={emptyFields}>
						Cancel
					</Button>
					<Button
						type='submit'
						className='SaveButton'
						disabled={disabled || isLoading}
						onClick={handleSubmit}
					>
						{isLoading ? <Loader /> : 'Save'}
					</Button>
				</ActionContainer>
			</FormContainer>
		</AddUserContainer>
	);
}

export default AddUser;
