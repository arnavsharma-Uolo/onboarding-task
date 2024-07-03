import styled from 'styled-components';
import { useState } from 'react';
import { toast } from 'react-toastify';

const UserListItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F6F6F6;
  border-radius: 16px;
  opacity: ${props => props.opacity || 1};
`;

const UserListItemImageError = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 300px;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-size: 2em;
  font-weight: 400;
  border-radius: 16px 16px 0 0;
`;

const UserListItemImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
`;

const UserListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  padding: 20px 0px;
  border: 1px solid #E2E2E2;
  border-radius: 0 0 16px 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 27.72px;
  width: calc(100% - 2px);

  p {
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Bold = styled.span`
  font-weight: 700;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin-left: 10px;
  width: 45px;
  height: 45px;
  background: #fefefe;
  border: 1px solid #E2E2E2;
  border-radius: 0 16px 0 16px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: large;

  &:hover {
    color: #FF0000;
    opacity: 1;
  }
`;

function UserListItem({ id, title, email, picture, onDeleted }) {
  const [imageError, setImageError] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleDelete = async (id) => {
    setOpacity(0.5);
    const requestOptions = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/${id}`, requestOptions);
      const result = await response.json();

      if(result.success === false)
        throw new Error(result.message);
        
        onDeleted();
      } catch (error) {
        setOpacity(1);
        toast.error(error.message);
        console.log(error);
    }
  }

  return (
    <UserListItemContainer opacity={ opacity }>
      <DeleteButton onClick={() => handleDelete(id)}>X</DeleteButton>
      {
        picture && !imageError ? (
          <UserListItemImage
            src={picture}
            alt={email}
            onError={() => setImageError(true)}
            loading='lazy'
          />
        ) : (
          <UserListItemImageError>No Image Found</UserListItemImageError>
        )
      }
      <UserListItemContent>
        <Bold>{title}</Bold>
        <p>{email}</p>
      </UserListItemContent> 
    </UserListItemContainer>
  );
}

export default UserListItem;
