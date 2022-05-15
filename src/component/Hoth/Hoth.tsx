import styled from "styled-components";
import Nav from "../Nav/Nav";
import WorkspaceContainer from "../Workspace/WorkspaceContainer";

const StyledDiv = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const Hoth = () => {
    return <StyledDiv>
        <Nav />
        <WorkspaceContainer />
    </StyledDiv>
}

export default Hoth;