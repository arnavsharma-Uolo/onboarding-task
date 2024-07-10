import styled from 'styled-components';
import Profile from '../profile/Profile';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as HamburgerIcon } from '../../assets/hamburger.svg';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
	z-index: 3;
	box-shadow: 0px 4px 4px 0px #0000000d;
	padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderHamburger = styled(HamburgerIcon)`
	display: none;
	cursor: pointer;
	@media screen and (max-width: 870px) {
		display: block;
	}
`;

function Header({ setSidebarOpen }) {
	return (
		<StyledHeader>
			<HeaderContent>
				<HeaderHamburger onClick={() => setSidebarOpen(true)} />
				<Link to='/'>
					<Logo />
				</Link>
				<Profile />
			</HeaderContent>
		</StyledHeader>
	);
}

export default Header;
