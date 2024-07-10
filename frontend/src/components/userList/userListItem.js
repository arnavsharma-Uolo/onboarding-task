import styled from 'styled-components';
import fetch_api from '../../lib/services/api_util';
import toast from 'react-hot-toast';
import { useState } from 'react';

const UserListItemContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #f6f6f6;
	border-radius: 16px;
	opacity: ${(props) => (props.deleting ? 0.5 : 1)};

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
	width: 100%;

	p {
		margin: 0;
	}

	@media screen and (max-width: 870px) {
		font-size: 20px;
	}

	@media screen and (max-width: 650px) {
		padding: 15px 0px;
		font-size: 14px;
	}
	@media screen and (max-width: 450px) {
		font-size: 10px;
		padding: 10px 0px;
		word-break: break-all;
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

		try {
			const result = await fetch_api('DELETE', `/v1/user/${id}`);

			if (result.success === false) {
				toast.error(result.error);
				setIsDeleting(false);

				return;
			}
			setTimeout(() => {
				onDeleted();
			}, 500);
		} catch (error) {
			setIsDeleting(false);
			toast.error('Server Connection Lost. Try Refreshing the Page');
			console.error(error);
		}
	};

	return (
		<UserListItemContainer deleting={isDeleting}>
			<DeleteButton onClick={() => handleDelete(id)} disabled={isDeleting}>
				X
			</DeleteButton>
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
