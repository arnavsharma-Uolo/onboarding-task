import { useCallback, useEffect, useState } from 'react';
import classes from  './UserList.module.css';
import UserListItem from './userListItem';
import Pagination from '../pagination/pagination';

function UserList ({searchQuery}) {
  const [userData, setUserData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: "follow"
    };
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user?q=${searchQuery}&page_number=${currPage}&limit=8`, requestOptions);
      const result = await response.json();
      
      if(result.success === false)
        throw new Error(response.message);

      setUserData(result.data);

      const pageCount = Math.ceil(result.total_count/8);
      setTotalPages(pageCount);

      if(currPage > pageCount)
        setCurrPage(1);
    } catch (error) {
      console.error(error);
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
      <div className={classes.UserListContainer}>
        {userData.length === 0 ? (
          <div className={classes.EmptyContainer}>
            No users found.
            </div>
        ) : (
          userData.map((user) => (
            <UserListItem
              key={user.id}
              id = {user.id}
              title={user.name}
              email={user.email}
              picture={user.image}
              onDeleted={refreshData}
            />
          ))
        )}
      </div>
      <div>
        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={totalPages} />
      </div>
    </>
  );
}

export default UserList;
