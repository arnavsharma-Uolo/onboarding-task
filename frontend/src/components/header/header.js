import styled from 'styled-components';
import Profile from '../profile/Profile';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  z-index: 3;
  box-shadow: 0px 4px 4px 0px #0000000D;
  padding: 1em 2em;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderHamburger = styled.div`
  display: none;
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderContent>
        <HeaderHamburger>|||</HeaderHamburger>
        <Link to="/"><Logo /></Link>
        <Profile />
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
