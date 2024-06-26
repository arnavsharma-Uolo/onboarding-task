import classes from  './sidebar.module.css';

function SidebarItem ({ icon, title, active }) {
  return (
    <div className={active ? `${classes.SidebarItemActive} && ${classes.SidebarItemContent}` : classes.SidebarItemContent}>
      <div className={active ? classes.IconActive : ''}>
        {icon}
      </div>
      <div className={classes.SidebarItemText}>
        {title}
      </div>
    </div>
  );
}

export default SidebarItem;
