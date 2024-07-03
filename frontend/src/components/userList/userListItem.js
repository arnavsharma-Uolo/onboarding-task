import styled from 'styled-components';
import { useState } from 'react';

const UserListItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 10px;
  background: #F6F6F6;
  border-radius: 16px;
`;

const UserListItemImage = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 322px;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 27.72px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;

  @media screen and (max-width: 768px) {
    width: 180px;
  }
`;

const UserListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  width: 288px;
  padding: 20px;
  border: 1px solid #E2E2E2;
  border-radius: 0 0 16px 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 27.72px;

  p {
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    width: 160px;
    padding: 10px;
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
  }
`;

function UserListItem({ id, title, email, picture, onDeleted }) {
  const [imageError, setImageError] = useState(false);

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/${id}`, requestOptions);
      const result = await response.json();

      if(result.success === false)
        throw new Error(response.message);

      onDeleted();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <UserListItemContainer>
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
          <UserListItemImage>No Image Found</UserListItemImage>
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
