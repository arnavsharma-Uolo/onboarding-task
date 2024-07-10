import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkWrapper = ({ isActive, ...props }) => <Link {...props} />;

const SidebarItemContent = styled(LinkWrapper)`
	display: flex;
	align-items: center;
	height: 3rem;
	padding: 0.5rem 1rem;
	gap: 1rem;
	color: #667085;
	background: ${(props) =>
		props.isActive ? 'rgba(86, 31, 231, 0.2)' : 'none'};
	color: ${(props) => (props.isActive ? '#561FE7' : '#667085')};
	font-weight: 600;
	text-decoration: none;
	transition: all 0.5s ease;

	&:hover {
		background: ${(props) =>
			props.isActive ? 'rgba(86, 31, 231, 0.2)' : 'rgba(86, 31, 231, 0.1)'};
		color: #561fe7;
	}
`;

const SidebarItemText = styled.div`
	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
`;

function SidebarItem({ link, icon, title, active, setSidebarOpen }) {
	return (
		<SidebarItemContent
			to={link}
			isActive={active}
			onClick={() => setSidebarOpen(false)}
		>
			<div>{icon}</div>
			<SidebarItemText>{title}</SidebarItemText>
		</SidebarItemContent>
	);
}

export default SidebarItem;
