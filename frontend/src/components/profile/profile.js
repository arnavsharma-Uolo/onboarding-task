import styled from 'styled-components';
import profilePic from '../../assets/profilePic.svg';
import { useState } from 'react';
import { ReactComponent as LogoutIcon } from '../../assets/logout_icon.svg';

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #F6F6F6;
  }
`;

const ProfileImage = styled.img`
`;
const ProfileText = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.1px;
  text-align: left;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ProfileModal = styled.div`
  position: absolute;
  top: 80%;
  right: 0;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 10px;
  background: #F6F6F6;
  border: 1px solid #E2E2E2;
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px #0000000D;
  z-index: 100;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.07px;
  letter-spacing: 0.45px;
  text-align: left;
`;

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ProfileContainer>
      <ProfileContent onClick={toggleModal}>
        <ProfileImage src={profilePic} alt="profile" />
        <ProfileText>Arnav</ProfileText>
        <ProfileText>\/</ProfileText>
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
