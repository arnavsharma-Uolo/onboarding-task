import UserList from '../../components/userList/userList';
import classes from  './ShowUser.module.css';

function ShowUser () {
  return (
    <div className={classes.ShowUserContainter}>
      <p className={classes.Heading}>Our Team</p>
      <div>
      <input className={classes.SearchInput} type="text" placeholder="Search by Name, or Email id" />
      <button className={classes.SearchButton}>Search</button>
        <div>
          <UserList />
          {/* <PaginationHandler /> */}
        </div>
      </div>
    </div>
  );
}

export default ShowUser;
