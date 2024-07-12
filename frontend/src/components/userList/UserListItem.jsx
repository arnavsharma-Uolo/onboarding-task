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

const UserListItemImageAlternative = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	min-height: ${(props) => (props.isLoading ? '350px' : 'none')};
	align-items: center;
	justify-content: center;
	font-family: 'Outfit', sans-serif;
	font-size: 2em;
	font-weight: 400;
	border-radius: 16px 16px 0 0;
	@media screen and (max-width: 436px) {
		min-height: 194.5px;
	}
	@media screen and (max-width: 376px) {
		min-height: 173.5px;
	}
	@media screen and (max-width: 321px) {
		min-height: 146px;
	}
`;

const UserListItemImage = styled.img`
	width: 100%;
	height: auto;
	object-fit: cover;
	border-radius: 16px 16px 0 0;
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
	transition: all 0.3s ease;
	font-size: large;

	&:hover {
		color: #ff0000;
	}
`;
const Loader = styled.span`
	width: 5rem;
	height: 5rem;
	border: 10px solid #e2e2e2;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@media screen and (max-width: 1250px) {
		width: 4.5rem;
		height: 4.5rem;
		border: 8px solid #e2e2e2;
		border-bottom-color: transparent;
	}
	@media screen and (max-width: 450px) {
		width: 4rem;
		height: 4rem;
		border: 8px solid #e2e2e2;
		border-bottom-color: transparent;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

function UserListItem({ id, title, email, picture, onDeleted }) {
	const [imageAlternative, setImageAlternative] = useState('');
	const [imageLoading, setImageLoading] = useState(true);
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
			console.error(error);
		}
	};

	const handleImageLoad = () => {
		setImageLoading(false);
	};

	const setImageError = () => {
		setImageLoading(true);
		setImageAlternative('No Image Found');
	};

	return (
		<UserListItemContainer deleting={isDeleting}>
			<DeleteButton onClick={() => handleDelete(id)} disabled={isDeleting}>
				X
			</DeleteButton>
			{picture && (
				<UserListItemImage
					src={picture}
					alt={email}
					onError={setImageError}
					onLoad={handleImageLoad}
					style={{ display: imageLoading ? 'none' : 'block' }}
				/>
			)}
			{imageLoading && (
				<UserListItemImageAlternative isLoading={imageLoading}>
					{picture === null ? (
						'No Image Found'
					) : imageAlternative === '' ? (
						<Loader />
					) : (
						imageAlternative
					)}
				</UserListItemImageAlternative>
			)}
			<UserListItemContent>
				<Bold>{title ? title : `...`}</Bold>
				<p>{email ? email : `...`}</p>
			</UserListItemContent>
		</UserListItemContainer>
	);
}

export default UserListItem;
