import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";

const LinkWrapper = ({ isActive, ...props }) => <Link {...props} />;

const SidebarItemContent = styled(LinkWrapper)`
  display: flex;
  align-items: center;
  height: 3em;
  padding: 0.5em 1em;
  gap: 1em;
  color: #667085;
  background: ${props => props.isActive ? 'rgba(86, 31, 231, 0.2)' : 'none'};
  color: ${props => props.isActive ? '#561FE7' : '#667085'};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    background: ${props => props.isActive ? 'rgba(86, 31, 231, 0.2)' : 'rgba(86, 31, 231, 0.1)'};
    color: #561FE7;
  }
`;

const SidebarItemText = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
`;

function SidebarItem({ link, icon, title }) {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <SidebarItemContent to={link} isActive={isActive}>
      <div>
        {icon}
      </div>
      <SidebarItemText>
        {title}
      </SidebarItemText>
    </SidebarItemContent>
  );
}

export default SidebarItem;
