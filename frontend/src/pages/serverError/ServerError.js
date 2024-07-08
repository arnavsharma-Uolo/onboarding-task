import styled from 'styled-components';
import errorImage from './../../assets/500_status_code.png';

const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	text-align: center;
	padding: 20px;
`;

const ErrorImage = styled.img`
	max-width: 800px;
	width: 80%;
	height: auto;
	border-radius: 10%;
`;

const ErrorMessage = styled.p`
	font-size: 1.2rem;
	margin: 20px 0;
`;

const HomeButton = styled.button`
	font-size: 1rem;
	padding: 10px 20px;
	cursor: pointer;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	transition: background-color 0.2s;

	&:hover {
		background-color: #0056b3;
	}
`;

const ServerError = () => {
	const goHome = () => {
		window.location.href = '/';
	};

	return (
		<ErrorContainer>
			<ErrorImage src={errorImage} alt='500 - Server Error' />
			<ErrorMessage>
				Something went wrong on our end. Please try again later.
			</ErrorMessage>
			<HomeButton onClick={goHome}>Go Home</HomeButton>
		</ErrorContainer>
	);
};

export default ServerError;
