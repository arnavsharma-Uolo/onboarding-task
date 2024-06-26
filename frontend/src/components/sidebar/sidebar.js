import classes from  './sidebar.module.css';
import SidebarItem from './sidebarItem';
import { ReactComponent as TeamMemberIcon } from '../../assets/team_member.svg';

import add_team from '../../assets/add_team.svg'

function Sidebar () {
  const sidebar_links = [{
    title: 'All Team Member',
    icon: <TeamMemberIcon style={{ fill: "#667085" }} />,
    link: '/',
    active: true
    },
    {
      title: 'Create Profile',
      icon: <img src={add_team} alt="add_team" />,
      link: '/',
      active: false
    }]
  return (
    <div className={classes.SidebarItem}>
      {sidebar_links.map((link, index) => <SidebarItem key={index} title={link.title} icon={link.icon} active={link.active} />)}
    </div>
  );
}

export default Sidebar;
