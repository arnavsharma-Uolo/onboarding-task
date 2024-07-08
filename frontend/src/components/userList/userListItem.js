import styled from 'styled-components';
import { useState } from 'react';
import { toast } from 'react-toastify';

const UserListItemContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #f6f6f6;
	border-radius: 16px;
	opacity: ${(props) => props.deleting ? 0.5 : 1};

	&:hover {
		button {
			opacity: 1;
		}
	}

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
	height: 100%;
	object-fit: cover;
	border-radius: 16px 16px 0 0;
	@media screen and (max-width: 500px) {
		
	}
`;

const UserListItemContent = styled.div`
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	align-items: center;
	flex-wrap: nowrap;
	padding: 20px 0px;
	border: 1px solid #e2e2e2;
	border-radius: 0 0 16px 16px;
	font-family: 'Outfit', sans-serif;
	font-size: 22px;
	font-weight: 400;
	line-height: 27.72px;
	width: 100%;

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
	border: 1px solid #e2e2e2;
	border-radius: 0 16px 0 16px;
	opacity: 0;
	transition: opacity 0.3s;
	font-size: large;

	&:hover {
		color: #ff0000;
	}
`;

function UserListItem({ id, title, email, picture, onDeleted }) {
	const [imageError, setImageError] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async (id) => {
		setIsDeleting(true);

		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await fetch(
				`http://localhost:8000/api/v1/user/${id}`,
				requestOptions,
			);
			const result = await response.json();

			if (result.success === false) throw new Error(result.message);

			setTimeout(() => {
			  onDeleted();
			}, 2000);
		} catch (error) {
			setIsDeleting(false);
			toast.error('Something went wrong. Please try again.');
			console.log(error);
		}
	};

	return (
		<UserListItemContainer deleting={isDeleting}>
			<DeleteButton onClick={() => handleDelete(id)} disabled={isDeleting}>X</DeleteButton>
			{picture && !imageError ? (
				<UserListItemImage
					src={picture}
					alt={email}
					onError={() => setImageError(true)}
					loading='lazy'
				/>
			) : (
				<UserListItemImageError>No Image Found</UserListItemImageError>
			)}
			<UserListItemContent>
				<Bold>{title ? title : `...`}</Bold>
				<p>{email ? email : `...`}</p>
			</UserListItemContent>
		</UserListItemContainer>
	);
}

export default UserListItem;
