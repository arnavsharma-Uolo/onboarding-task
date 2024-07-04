import styled from 'styled-components';
import ModalComponent from '../../components/modal/Modal';
import { ReactComponent as PlaceholderIcon } from '../../assets/placeholder.svg';
import { ReactComponent as DownloadButtonIcon } from '../../assets/download_button.svg';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const AddUserContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 2em;
	height: --webkit-fill-available;
`;

const FormContainer = styled.form`
	display: flex;
	text-align: left;
	flex-direction: column;
	width: 25em;
	background: #ffffff;
	border: 1px solid #eaecf0;
	border-radius: 16px;
`;

const FieldsContainer = styled.div`
	padding: 1.2em 1em 0em 1em;
`;

const ActionContainer = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	gap: 1em;
	padding: 0.5em;
	border-top: 1px solid #eaecf0;
`;

const Button = styled.button`
	font-family: 'Open Sans', sans-serif;
	font-size: 1em;
	font-weight: 600;
	text-align: center;
	cursor: pointer;
	padding: 0.6em 2.6em;
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
	font-family: 'Outfit', sans-serif;
	font-size: 2em;
	font-weight: 700;
	text-align: center;
	color: #101828;
`;

const Subtext = styled.span`
	font-family: 'Open Sans', sans-serif;
	font-size: 0.7em;
	font-weight: 400;
	line-height: 16.34px;
	letter-spacing: 0.4000000059604645px;
	text-align: left;
	color: #667085;
`;
const InputContainer = styled.div`
	position: relative;
	padding-bottom: 1em;
`;

const ErrorMessage = styled.span`
	font-family: 'Open Sans', sans-serif;
	font-size: 0.7em;
	font-weight: 400;
	text-align: right;
	color: red;
	position: absolute;
	right: 0;
	visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

const InputText = styled.div`
	font-family: 'Open Sans', sans-serif;
	font-size: 14px;
	font-weight: 600;
	text-align: left;
	color: #344054;

	span {
		color: red;
	}
`;

const Input = styled.input`
	box-sizing: border-box;
	width: 100%;
	border: 1px solid #d0d5dd;
	border-radius: 8px;
	padding: 1em;
`;

const ImageContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 7em;
	height: 7em;
	border-radius: 50%;
	margin: 1em 0em 1em 0em;
`;

const Image = styled.img`
	width: 7em;
	height: 7em;
	border-radius: 50%;
`;

const Placeholder = styled(PlaceholderIcon)``;

const DownloadButton = styled(DownloadButtonIcon)`
	padding: 5px;
	width: 30px;
	height: 30px;
	position: absolute;
	bottom: 0;
	right: 0;
	background: #ffffff;
	border: 2px solid #e2e2e2;
	border-radius: 50%;
	font-size: large;
`;

function AddUser() {
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
	const [isModalOpen, setIsModalOpen] = useState(false);

	const updateFormData = (e) => {
		const MIN_NAME_LENGTH = 3;
		const MIN_PASSWORD_LENGTH = 5;
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

		if (name === 'name') {
			setFormDataError({
				...formDataError,
				[name]:
					value.length < MIN_NAME_LENGTH
						? `Name must be at least ${MIN_NAME_LENGTH} characters`
						: '',
			});
		} else if (name === 'email') {
			setFormDataError({
				...formDataError,
				[name]: !emailRegex.test(value) ? 'Invalid email' : '',
			});
		} else if (name === 'password') {
			setFormDataError({
				...formDataError,
				[name]:
					value.length < MIN_PASSWORD_LENGTH
						? `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
						: '',
			});
		} else if (name === 'confirmPassword') {
			setFormDataError({
				...formDataError,
				[name]: value !== formData.password ? 'Passwords do not match' : '',
			});
		} else if (name === 'image') {
			setFormDataError({
				...formDataError,
				[name]: !value ? 'Please select an image' : '',
			});
		}

		setDisabled(
			formDataError.name ||
				formDataError.email ||
				formDataError.password ||
				formDataError.confirmPassword ||
				formDataError.image,
		);
	};

	const fileInputRef = useRef(null);

	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			setFormData({ ...formData, image: e.target.files[0] });
		}
		setImageURL(URL.createObjectURL(e.target.files[0]));
	};

	const triggerFileInputClick = () => {
		fileInputRef.current.click();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', formData.name);
		formData.append('email', formData.email);
		formData.append('password', formData.password);
		formData.append('file', formData.image);

		const requestOptions = {
			method: 'POST',
			body: formData,
		};

		try {
			const response = await fetch(
				`http://localhost:8000/api/v1/user`,
				requestOptions,
			);
			const result = await response.json();

			if (result.success === false) throw new Error(result.message);

			console.log(result);
			emptyFields();
			setIsModalOpen(true);
		} catch (error) {
			toast.error(error.message);
			console.error(error);
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
		window.location.href = '/';
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
						<InputText>
							Upload Photo<span>*</span>
						</InputText>
						<Subtext>Upload passport size photo</Subtext>
						<ImageContainer onClick={triggerFileInputClick}>
							<input
								type='file'
								ref={fileInputRef}
								onChange={handleImageChange}
								accept='image/*'
								style={{ display: 'none' }}
							/>
							{formData.image && imageURL ? (
								<Image src={imageURL} alt='Uploaded' />
							) : (
								<Placeholder />
							)}
							<DownloadButton />
							<ErrorMessage show={formDataError.image}>
								{formDataError.image}
							</ErrorMessage>
						</ImageContainer>
					</InputContainer>
					<InputContainer>
						<InputText>
							Name
							<span>
								{' '}
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
							Email
							<span>
								{' '}
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
								{' '}
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
								{' '}
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
						disabled={disabled}
						onClick={handleSubmit}
					>
						Save
					</Button>
				</ActionContainer>
			</FormContainer>
		</AddUserContainer>
	);
}

export default AddUser;
