import classes from './UserList.module.css';

function UserListItem({ id, title, email, picture, onDeleted }) {
  // Fixed the function declaration to be a function expression
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
      {/* Fixed the event handler from 'onclick' to 'onClick' and updated to use a function that calls handleDelete with id */}
      <button className={classes.DeleteButton} onClick={() => handleDelete(id)}>X</button>
      <img className={classes.UserListItemImage} src={`http://localhost:8000${picture}`} alt={email} crossOrigin="anonymous"/>
      <div className={classes.UserListItemContent}>
        <p className={classes.Bold}>{title}</p>
        <p>{email}</p>
      </div> 
    </div>
  );
}

export default UserListItem;
