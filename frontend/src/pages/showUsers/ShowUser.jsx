import styled from 'styled-components';
import UserList from '../../components/userList/UserList';
import useDebounce from '../../lib/services/Debounce';
import { useState } from 'react';
import { ReactComponent as SearchIconSVG } from '../../assets/search_icon.svg';
import { ReactComponent as ClearIconSVG } from '../../assets/clear_icon.svg';

const ShowUserContainer = styled.div`
	box-sizing: border-box;
	max-width: 100vw;
	background: #ffffff;
	padding: 25px;
	height: -webkit-fill-available;
	@media screen and (max-width: 768px) {
		padding: 10px;
	}
`;

const Heading = styled.p`
	color: #101828;
	font-family: 'Outfit', sans-serif;
	font-size: 32px;
	font-weight: 700;
	letter-spacing: 0.25px;
	line-height: 40.32px;
	text-align: center;
	margin: 0.5rem 0rem 1rem 0rem;
`;

const SearchInputContainer = styled.div`
	align-items: stretch;
	display: flex;
	justify-content: center;
	margin: auto;
	position: relative;
	width: 100%;
	margin-bottom: 20px;
`;

const SearchIcon = styled(SearchIconSVG)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	height: 2rem;
	left: 1rem;
	width: 20px;
`;

const CancelIcon = styled(ClearIconSVG)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 10rem;
	width: 20px;
	opacity: ${(props) => (props.closed ? '0' : '1')};
	height: auto;
	transition: all 0.3s ease;

	&:hover {
		cursor: pointer;
	}
	@media screen and (max-width: 500px) {
		display: none;
	}
`;

const SearchInput = styled.input`
	border: 2px solid #d0d5dd;
	border-right: 1px solid #d0d5dd;
	border-radius: 12px 0px 0px 12px;
	font-family: 'Open Sans', sans-serif;
	font-size: 16px;
	font-weight: 600;
	line-height: 24px;
	padding: 1rem 2rem 1rem 3rem;
	text-align: left;
	color: #101828;

	width: calc(100% - 10rem);

	&::placeholder {
		font-weight: 400;
		color: #98a2b3;
	}

	@media screen and (max-width: 500px) {
		padding: 1rem 0rem 1rem 3rem;
		width: 100%;
	}
	@media screen and (max-width: 390px) {
		font-size: 15px;
	}
`;

const SearchButton = styled.button`
	background: #f6f6f6;
	border: 1px solid #d0d5dd;
	border-radius: 0px 12px 12px 0px;
	color: #101828;
	font-family: 'Open Sans', sans-serif;
	font-size: 16px;
	font-weight: 600;
	line-height: 21.79px;
	text-align: center;
	transition: all 0.3s ease;
	width: 10rem;
	align-self: stretch;

	&:hover {
		background: #d0d5dd;
		cursor: pointer;
	}
	@media screen and (max-width: 500px) {
		width: 7rem;
	}
	@media screen and (max-width: 390px) {
		width: min-content;
	}
`;

function ShowUser() {
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	useDebounce(
		() => {
			setDebouncedSearchQuery(searchQuery);
		},
		[searchQuery],
		500,
	);

	return (
		<ShowUserContainer>
			<Heading>Our Team</Heading>
			<div>
				<SearchInputContainer>
					<SearchIcon />
					<SearchInput
						type='text'
						placeholder='Search by Name, or Email id'
						value={searchQuery}
						onChange={handleInputChange}
					/>
					<SearchButton>Search</SearchButton>
					<CancelIcon onClick={() => setSearchQuery('')} closed={searchQuery === ''} />
				</SearchInputContainer>
				<div>
					<UserList searchQuery={debouncedSearchQuery} />
				</div>
			</div>
		</ShowUserContainer>
	);
}

export default ShowUser;
