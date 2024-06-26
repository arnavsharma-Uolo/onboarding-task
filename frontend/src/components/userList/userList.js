import classes from  './UserList.module.css';
import UserListItem from './userListItem';

function UserList () {
  return (
    <div className={classes.UserListContainer}>
      <UserListItem title={"User 1"} />
    </div>
  );
}

export default UserList;
