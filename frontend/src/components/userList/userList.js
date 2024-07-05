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
  100% {background-size:120% 100%}
`;

const LoaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	width: rem;
	height: 1rem;
	-webkit-mask: radial-gradient(circle closest-side, #000 94%, #0000) left/20%
		100%;
	background: linear-gradient(#000 0 0) left/0% 100% no-repeat #ddd;
	animation: ${loadingAnimation} 2s infinite steps(6);
`;

function UserList({ searchQuery }) {
	const [userData, setUserData] = useState([]);
	const [currPage, setCurrPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

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
			toast.error(error.message);
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
				<EmptyContainer>No users found.</EmptyContainer>
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
