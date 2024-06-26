import classes from  './UserList.module.css';

function UserListItem ({ title }) {
  return (
    <div className={classes.UserListContainer}>
      {title}
    </div>
  );
}

export default UserListItem;
