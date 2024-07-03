import styled from 'styled-components';
import Pagination from '../pagination/Pagination';
import UserListItem from './UserListItem';
import { useCallback, useEffect, useState } from 'react';


const UserListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  min-height: 70vh;
  padding-top: 20px;
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 35px;
  font-weight: 400;
  line-height: 27.72px;
`;

function UserList ({searchQuery}) {
  const [userData, setUserData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user?q=${searchQuery}&page=${currPage}&limit=8`, requestOptions);
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
      <UserListContainer>
        {userData.length === 0 ? (
          <EmptyContainer>
            No users found.
            </EmptyContainer>
        ) : (
          userData.map((user) => (
            <UserListItem
              key={user._id}
              id = {user._id}
              title={user.name}
              email={user.email}
              picture={user.image}
              onDeleted={refreshData}
            />
          ))
        )}
      </UserListContainer>
      <>
        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={totalPages} />
      </>
    </>
  );
}

export default UserList;
