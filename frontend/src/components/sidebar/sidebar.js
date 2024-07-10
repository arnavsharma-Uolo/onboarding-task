import styled from 'styled-components';
import ModalComponent from '../../components/modal/Modal';
import SidebarItem from './SidebarItem';
import { ReactComponent as AddTeamIcon } from '../../assets/add_team.svg';
import { ReactComponent as AddTeamSelectedIcon } from '../../assets/add_team_selected.svg';
import { ReactComponent as Logo } from '../../assets/logo_lg.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout_icon.svg';
import { ReactComponent as TeamMemberIcon } from '../../assets/team_member.svg';
import { ReactComponent as TeamMemberSelectedIcon } from '../../assets/team_member_selected.svg';
import { logoutUser } from '../../lib/services/LogoutUser';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const SidebarContainer = styled.div`
	display: block;
	width: 18vw;
	min-width: 250px;
	padding: 1rem 0;
	background: #ffffff;
	box-shadow: 4px 0 4px 0 #0000000d;
	z-index: 2;
	font-weight: 600;
	transition: all 0.3s ease;

	@media screen and (max-width: 870px) {
		display: ${(props) => (props.sidebarOpen ? 'block' : 'none')};
		background: rgba(0, 0, 0, 0.5);
		padding: 0;
		position: absolute;
		width: 100%;
		z-index: 100;
		height: 100%;
		top: 0;
		position: fixed;
	}
`;

const SidebarContent = styled.div`
	@media screen and (max-width: 870px) {
		width: 80%;
		background: #ffffff;
		height: 100%;
	}
`;

const LogoIcon = styled(Logo)`
	display: none;

	@media screen and (max-width: 870px) {
		display: inline-block;
		padding: 3rem 0rem 4rem 0rem;
	}
`;

const Items = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: calc(100vh - 170px);
`;

const LogoutContainer = styled.div`
	display: ${(props) => (props.sidebarOpen ? 'flex' : 'none')};
	align-items: center;
	font-family: 'Open Sans';
	font-size: 1rem;
	font-weight: 600;
	text-align: left;
	color: #667085;
	height: 3rem;
	padding: 0.5rem 1rem;
	gap: 0.5rem;
	cursor: pointer;

	&:hover {
		background: #f6f6f6;
	}
`;

function Sidebar({ sidebarOpen, setSidebarOpen }) {
	const location = useLocation();
	const sidebarRef = useRef();
	const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);

	useEffect(() => {
		function handleClickOutside(event) {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setSidebarOpen(false);
			}
		}

		// Add event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Remove event listener on cleanup
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setSidebarOpen]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 865) {
				setSidebarOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, [setSidebarOpen]);

	const sidebar_items = [
		{
			title: 'All Team Member',
			icon:
				location.pathname === '/' ? (
					<TeamMemberSelectedIcon />
				) : (
					<TeamMemberIcon />
				),
			link: '/',
			active: location.pathname === '/',
		},
		{
			title: 'Create Profile',
			icon:
				location.pathname === '/create-profile' ? (
					<AddTeamSelectedIcon />
				) : (
					<AddTeamIcon />
				),
			link: '/create-profile',
			active: location.pathname === '/create-profile',
		},
	];
	const handleLogout = async () => {
		setSidebarOpen(false);
		await logoutUser();
		setIsGlobalModalOpen(true);
	};

	const closeGlobalModal = () => {
		setIsGlobalModalOpen(false);
		window.location.href = '/login';
	};

	return (
		<>
			<ModalComponent
				isOpen={isGlobalModalOpen}
				icon={'done'}
				message='You have been successfully logout '
				onClose={closeGlobalModal}
			/>
			<SidebarContainer sidebarOpen={sidebarOpen}>
				<SidebarContent ref={sidebarRef}>
					<LogoIcon />
					<Items>
						<div className='items'>
							{sidebar_items.map((sidebarItem, index) => (
								<SidebarItem
									key={index}
									link={sidebarItem.link}
									title={sidebarItem.title}
									icon={sidebarItem.icon}
									active={sidebarItem.active}
									setSidebarOpen={setSidebarOpen}
								/>
							))}
						</div>
						<div className='items-end'>
							<LogoutContainer sidebarOpen={sidebarOpen} onClick={handleLogout}>
								<LogoutIcon /> Logout
							</LogoutContainer>
						</div>
					</Items>
				</SidebarContent>
			</SidebarContainer>
		</>
	);
}

export default Sidebar;
