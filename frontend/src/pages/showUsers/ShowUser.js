import styled from 'styled-components';
import useDebounce from '../../lib/debounce';
import UserList from '../../components/userList/UserList';
import { useState } from 'react';
import { ReactComponent as SearchIconSVG } from '../../assets/search_icon.svg';

const ShowUserContainer = styled.div`
  background: #ffffff;
  padding: 25px;
`;

const Heading = styled.p`
  color: #101828;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.25px;
  line-height: 40.32px;
  text-align: center;
`;

const SearchInputContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  border: 2px solid #D0D5DD;
  border-radius: 8px 0px 0px 8px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  height: 38px;
  line-height: 24px;
  padding: 10px;
  padding-left: 50px;
  text-align: left;
  width: 70%;
`;

const SearchIcon = styled(SearchIconSVG)`
  height: 20px;
  left: 4em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
`;

const SearchButton = styled.button`
  background: #F6F6F6;
  border: 1px solid #D0D5DD;
  border-radius: 0px 8px 8px 0px;
  color: #101828;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  height: 62px;
  line-height: 21.79px;
  text-align: center;
  transition: all 0.3s ease;
  width: 20%;

  &:hover {
    background: #D0D5DD;
    cursor: pointer;
  }
`;

function ShowUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useDebounce(() => {
    setDebouncedSearchQuery(searchQuery);
  }, [searchQuery], 500);

  return (
    <ShowUserContainer>
      <Heading>Our Team</Heading>
      <div>
        <SearchInputContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search by Name, or Email id"
            value={searchQuery}
            onChange={handleInputChange}
          />
        <SearchButton>Search</SearchButton>
        </SearchInputContainer>
        <div>
        <UserList searchQuery={debouncedSearchQuery} />
        </div>
      </div>
    </ShowUserContainer>
  );
}

export default ShowUser;
