import React, { useState } from 'react'; // Import useState
import UserList from '../../components/userList/userList';
import classes from './ShowUser.module.css';
import useDebounce from '../../lib/debounce';

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
    <div className={classes.ShowUserContainter}>
      <p className={classes.Heading}>Our Team</p>
      <div>
        <input
          className={classes.SearchInput}
          type="text"
          placeholder="Search by Name, or Email id"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className={classes.SearchButton}>Search</button>
        <div>
        <UserList searchQuery={debouncedSearchQuery} />
        </div>
      </div>
    </div>
  );
}

export default ShowUser;
