import classes from  './sidebar.module.css';
import { MdPeopleAlt } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import SidebarItem from './sidebarItem';

function Sidebar () {
  const sidebar_links = [{
    title: 'All Team Member',
    icon: <MdPeopleAlt color="#667085" size={24} />,
    link: '/'
    },
    {
      title: 'Create Profile',
      icon: <BsPersonPlus color="#667085" size={24} />,
      link: '/'
    }]
  return (
    <div className={classes.SidebarItem}>
      {sidebar_links.map((link, index) => <SidebarItem key={index} title={link.title} icon={link.icon} />)}
    </div>
  );
}

export default Sidebar;
