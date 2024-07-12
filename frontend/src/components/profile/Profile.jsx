import styled from 'styled-components';
import profilePic from '../../assets/profilePic.svg';
import ModalComponent from '../modal/Modal';
import { ReactComponent as DropDown } from '../../assets/drop_down.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout_icon.svg';
import { logoutUser } from '../../lib/services/LogoutUser';
import { useEffect, useRef, useState } from 'react';

const ProfileContainer = styled.div`
	position: relative;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	height: 4rem;
	@media screen and (max-width: 870px) {
		height: 1.5rem;
	}
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
	@media screen and (max-width: 870px) {
		padding: 0;
		cursor: default;
	}
`;

const ProfileImage = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	@media screen and (max-width: 870px) {
		width: 24px;
		height: 24px;
	}
`;

const ProfileText = styled.span`
	font-family: 'Open Sans', sans-serif;
	font-size: 1.3rem;
	font-weight: 600;
	color: #344054;

	@media screen and (max-width: 870px) {
		display: none;
	}
`;

const DropDownIcon = styled(DropDown)`
	@media screen and (max-width: 870px) {
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
	cursor: pointer;
	p {
		margin: 0;
	}

	@media screen and (max-width: 870px) {
		width: 10rem;
	}
`;

function Profile() {
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const toggleModal = () => {
		if (window.innerWidth <= 870) {
			return;
		}
		setIsProfileModalOpen(!isProfileModalOpen);
	};

	const closeGlobalModal = () => {
		setIsGlobalModalOpen(false);
		window.location.href = '/login';
	};
	const handleLogout = async () => {
		setIsProfileModalOpen(false);
		await logoutUser();
		setIsGlobalModalOpen(true);
	};

	const logoutRef = useRef(null);
	useEffect(() => {
		function handleClickOutside(event) {
			if (!logoutRef.current.contains(event.target)) {
				setIsProfileModalOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 865) {
				setIsProfileModalOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, [setIsProfileModalOpen]);

	return (
		<>
			<ModalComponent
				isOpen={isGlobalModalOpen}
				icon={'done'}
				message='You have been successfully logout '
				onClose={closeGlobalModal}
			/>
			<ProfileContainer ref={logoutRef}>
				{user.name && user.image && (
					<ProfileContent onClick={toggleModal}>
						<ProfileImage src={user?.image || profilePic} alt='profile' />
						<ProfileText>
							{user?.name ? user.name.split(' ')[0] : 'User'}
						</ProfileText>
						<DropDownIcon />
					</ProfileContent>
				)}
				{isProfileModalOpen && (
					<ProfileModal onClick={handleLogout}>
						<LogoutIcon />
						<p>Logout</p>
					</ProfileModal>
				)}
			</ProfileContainer>
		</>
	);
}

export default Profile;
