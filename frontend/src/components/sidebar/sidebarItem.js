import classes from  './sidebar.module.css';

function SidebarItem ({ icon, title }) {
  return (
    <div className={`${classes.SidebarItemContent}`}>
      {icon}
      <div className={classes.SidebarItemText}>
        {title}
      </div>
    </div>
  );
}

export default SidebarItem;
