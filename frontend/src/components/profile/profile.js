import styled from 'styled-components';
import profilePic from '../../assets/profilePic.svg';
import { useState } from 'react';
import { ReactComponent as LogoutIcon } from '../../assets/logout_icon.svg';
import { ReactComponent as DropDown } from '../../assets/drop_down.svg';

const ProfileContainer = styled.div`
	position: relative;
`;

const ProfileContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	padding: 0.5rem 1rem;
	cursor: pointer;
	border-radius: 10px;
	transition: all 0.3s ease;

	&:hover {
		background: #f6f6f6;
	}
	@media screen and (max-width: 768px) {
		padding: 0;
	}
`;

const ProfileImage = styled.img`
	width: 3rem;
	height: 3rem;
	@media screen and (max-width: 768px) {
		width: 24px;
		height: 24px;
	}
`;

const ProfileText = styled.span`
	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
	font-weight: 600;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const DropDownIcon = styled(DropDown)`
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
	gap: 1rem;
	width: 15rem;
	padding: 1rem;
	background: #f6f6f6;
	border: 1px solid #e2e2e2;
	border-radius: 10px;
	box-shadow: 0px 2px 4px 0px #0000000d;
	z-index: 100;
	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
	font-weight: 400;
	p {
		margin: 0;
	}

	@media screen and (max-width: 768px) {
		width: 10rem;
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
				<ProfileText>Vikrant</ProfileText>
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
