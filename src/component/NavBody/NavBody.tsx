import styled from "styled-components";
import { INavBody } from "../../interface/INavBody";

const StyledDiv = styled.div`
    flex: 1;
`;

const NavBody = ({children}: INavBody) => {
    return <StyledDiv>{children}</StyledDiv>
}

export default NavBody;