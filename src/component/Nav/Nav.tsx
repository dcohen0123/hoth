import styled from "styled-components";
import NavMenu from "../NavMenu/NavMenu";
import Navbar from "../Navbar/Navbar";

const StyledNav = styled.div`
    display: flex;
`;

const Nav = () => {
    return <StyledNav>
        <Navbar />
        <NavMenu />
    </StyledNav>
}

export default Nav;