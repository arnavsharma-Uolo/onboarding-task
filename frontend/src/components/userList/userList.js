import { useEffect, useState } from 'react';
import classes from  './UserList.module.css';
import UserListItem from './userListItem';
import Pagination from '../pagination/pagination';

function UserList ({searchQuery}) {
  const [userData, setuserData] = useState([]);
  const [currPage, setcurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
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
      setuserData(result.data);
      setTotalPages(Math.ceil(result.total_count/8));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currPage, searchQuery]);

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
        <Pagination currPage={currPage} setcurrPage={setcurrPage} totalPages={totalPages} />
      </div>
    </>
  );
}

export default UserList;
