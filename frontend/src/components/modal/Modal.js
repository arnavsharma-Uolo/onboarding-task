import styled from 'styled-components';
import { done_gif } from '../../lib/constants';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  padding: 80px;
  border-radius: 16px;
`;

const ModalIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0; 
  right: 0;
  margin: 15px;
  cursor: pointer;
  background-color: white;
  border: 0px;
  font-size: large;
`;

const ModalText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  color: #404040;
`;

function Modal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ModalIcon src={done_gif} alt="Done" />
        <ModalText>{message}</ModalText>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default Modal;
