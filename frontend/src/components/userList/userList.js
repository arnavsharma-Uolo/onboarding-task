import styled, { keyframes } from 'styled-components';
import Pagination from '../pagination/Pagination';
import UserListItem from './UserListItem';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UserListContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	gap: 2rem;
`;

const EmptyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-family: 'Outfit', sans-serif;
	font-size: 2.5rem;
	font-weight: 400;
	height: 20rem;
	width: 100%;
`;

const loadingAnimation = keyframes`
  to{transform: rotate(1turn)}
`;

const LoaderContent = styled.div`
	width: 50px;
	padding: 8px;
	aspect-ratio: 1;
	border-radius: 50%;
	--_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
	mask: var(--_m);
	mask-composite: subtract;
	background: linear-gradient(#000 0 0) left/0% 100% no-repeat #ddd;
	animation: ${loadingAnimation} 1s infinite linear;
`;

function UserList({ searchQuery }) {
	const [userData, setUserData] = useState([]);
	const [currPage, setCurrPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('No Users Found!');

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await fetch(
				`http://localhost:8000/api/v1/user?q=${searchQuery}&page=${currPage}&limit=8`,
				requestOptions,
			);
			const result = await response.json();

			if (result.success === false) throw new Error(result.message);

			setUserData(result.data);

			const pageCount = Math.ceil(result.total_count / 8);
			setTotalPages(pageCount);

			if (currPage > pageCount) setCurrPage(1);
		} catch (error) {
			setErrorMessage('Failed to fetch users...');
			toast.error('Something went wrong. Please try again.');
		} finally {
			setIsLoading(false);
		}
	}, [searchQuery, currPage]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const refreshData = () => {
		fetchData();
	};

	return (
		<>
			{isLoading ? (
				<EmptyContainer>
					<LoaderContent />
				</EmptyContainer>
			) : userData.length === 0 ? (
				<EmptyContainer>{errorMessage}</EmptyContainer>
			) : (
				<>
					<UserListContainer>
						{userData.map((user) => (
							<UserListItem
								key={user._id}
								id={user._id}
								title={user.name}
								email={user.email}
								picture={user.image}
								onDeleted={refreshData}
							/>
						))}
					</UserListContainer>
					<Pagination
						currPage={currPage}
						setCurrPage={setCurrPage}
						totalPages={totalPages}
					/>
				</>
			)}
		</>
	);
}

export default UserList;
