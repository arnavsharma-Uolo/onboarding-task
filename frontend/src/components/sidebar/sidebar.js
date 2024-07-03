import styled from 'styled-components';
import SidebarItem from './SidebarItem';
import { ReactComponent as AddTeamIcon } from '../../assets/add_team.svg';
import { ReactComponent as AddTeamSelectedIcon } from '../../assets/add_team_selected.svg';
import { ReactComponent as TeamMemberIcon } from '../../assets/team_member.svg';
import { ReactComponent as TeamMemberSelectedIcon } from '../../assets/team_member_selected.svg';
import { useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
  display: none;
  width: 20vw;
  min-width: 240px;
  padding: 16px 0;
  background: #ffffff;
  box-shadow: 4px 0 4px 0 #0000000D;
  z-index: 2;
  font-weight: 600;
  transition: all 0.3s ease;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

function Sidebar() {
  const location = useLocation();

  const sidebar_items = [{
    title: 'All Team Member',
    icon: location.pathname === '/' ? <TeamMemberSelectedIcon /> : <TeamMemberIcon />,
    link: '/',
  },
  {
    title: 'Create Profile',
    icon: location.pathname === '/create-profile' ? <AddTeamSelectedIcon /> : <AddTeamIcon />,
    link: '/create-profile',
  }];

  return (
    <SidebarContainer>
      {sidebar_items.map((sidebarItem, index) => (
        <SidebarItem key={index} link={sidebarItem.link} title={sidebarItem.title} icon={sidebarItem.icon} active={sidebarItem.active} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
