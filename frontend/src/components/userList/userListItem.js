import { useState } from 'react';
import classes from './UserList.module.css';

function UserListItem({ id, title, email, picture, onDeleted }) {
  const [imageError, setImageError] = useState(false);

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/${id}`, requestOptions);
      const result = await response.json();

      if(result.success === false)
        throw new Error(response.message);

      onDeleted();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classes.UserListItemContainer}>
      <button className={classes.DeleteButton} onClick={() => handleDelete(id)}>X</button>
      {
        picture && !imageError ? (
          <img
            className={classes.UserListItemImage}
            src={picture.startsWith("http") ? picture : `http://localhost:8000${picture}`}
            alt={email}
            onError={() => setImageError(true)}
            loading='lazy'
          />
        ) : (
          <div className={classes.UserListItemImage} >No Image Found</div>
        )
      }
      <div className={classes.UserListItemContent}>
        <p className={classes.Bold}>{title}</p>
        <p>{email}</p>
      </div> 
    </div>
  );
}

export default UserListItem;
