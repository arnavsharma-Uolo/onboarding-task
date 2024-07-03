import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";

const SidebarItemContent = styled(Link)`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 12px 16px;
  gap: 10px;
  color: #667085;
  background: ${props => props.isActive ? 'rgba(86, 31, 231, 0.2)' : 'none'};
  font-weight: ${props => props.isActive ? '700' : 'normal'};
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    background: rgba(86, 31, 231, 0.1);
    color: #561FE7;
  }
`;

const SidebarItemText = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
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
