import classes from  './UserList.module.css';

function UserListItem ({ title, email, picture }) {
  return (
    <div className={classes.UserListItemContainer}>
      <img className={classes.UserListItemImage} src={`http://localhost:8000${picture}`} alt={email} crossOrigin="anonymous"/>
      <div className={classes.UserListItemContent}>
        <p className={classes.Bold}>{title}</p>
        <p>{email}</p>
      </div> 
    </div>
  );
}

export default UserListItem;
