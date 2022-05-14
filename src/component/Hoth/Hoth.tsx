import styled from "styled-components";
import Nav from "../Nav/Nav";
import Workspace from "../Workspace/Workspace";

const StyledDiv = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const Hoth = () => {
    return <StyledDiv>
        <Nav />
        <Workspace />
    </StyledDiv>
}

export default Hoth;