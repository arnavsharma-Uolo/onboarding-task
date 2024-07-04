import styled from 'styled-components';
import profilePic from '../../assets/profilePic.svg';
import { useState } from 'react';
import { ReactComponent as LogoutIcon } from '../../assets/logout_icon.svg';
import { ReactComponent as DropDownIcon } from '../../assets/drop_down.svg';

const ProfileContainer = styled.div`
	position: relative;
`;

const ProfileContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1em;
	padding: 0.5em 1em;
	cursor: pointer;
	border-radius: 10px;
	transition: all 0.3s ease;

	&:hover {
		background: #f6f6f6;
	}
`;

const ProfileImage = styled.img`
	width: 3em;
	height: 3em;
`;

const ProfileText = styled.span`
	font-family: 'Open Sans', sans-serif;
	font-size: 1em;
	font-weight: 600;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const ProfileModal = styled.div`
	position: absolute;
	top: 90%;
	right: 0;
	display: flex;
	align-items: center;
	gap: 1em;
	width: 15em;
	padding: 1em;
	background: #f6f6f6;
	border: 1px solid #e2e2e2;
	border-radius: 10px;
	box-shadow: 0px 2px 4px 0px #0000000d;
	z-index: 100;
	font-family: 'Open Sans', sans-serif;
	font-size: 1em;
	font-weight: 400;
	p {
		margin: 0;
	}

	@media screen and (max-width: 768px) {
		width: 10em;
	}
`;

function Profile() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<ProfileContainer>
			<ProfileContent onClick={toggleModal}>
				<ProfileImage src={profilePic} alt='profile' />
				<ProfileText>Arnav</ProfileText>
				<DropDownIcon />
			</ProfileContent>
			{isModalOpen && (
				<ProfileModal>
					<LogoutIcon />
					<p>Logout</p>
				</ProfileModal>
			)}
		</ProfileContainer>
	);
}

export default Profile;
