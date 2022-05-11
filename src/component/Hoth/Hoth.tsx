import styled from "styled-components";
import Navbar from "../Navbar/Navbar";

const StyledDiv = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const Hoth = () => {
    return <StyledDiv>
        <Navbar />
        {/* <Workspace /> */}
    </StyledDiv>
}

export default Hoth;