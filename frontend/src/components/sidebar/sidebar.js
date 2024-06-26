import classes from  './sidebar.module.css';
import SidebarItem from './sidebarItem';
import { ReactComponent as TeamMemberIcon } from '../../assets/team_member.svg';
import { ReactComponent as TeamMemberSelectedIcon } from '../../assets/team_member_selected.svg';
import { ReactComponent as AddTeamIcon } from '../../assets/add_team.svg';
import { ReactComponent as AddTeamSelectedIcon } from '../../assets/add_team_selected.svg';
import { useLocation } from 'react-router-dom';

function Sidebar () {
  const location = useLocation();

  const sidebar_items = [{
    title: 'All Team Member',
    icon: location.pathname === '/' ? <TeamMemberSelectedIcon/> : <TeamMemberIcon />,
    link: '/',
    },
    {
      title: 'Create Profile',
    icon: location.pathname === '/create-profile' ? <AddTeamSelectedIcon/> : <AddTeamIcon />,
      link: '/create-profile',
    }]
  return (
    <div className={classes.SidebarItem}>
      {sidebar_items.map((sidebarItem, index) => <SidebarItem key={index} link={sidebarItem.link} title={sidebarItem.title} icon={sidebarItem.icon} active={sidebarItem.active} />)}
    </div>
  );
}

export default Sidebar;
