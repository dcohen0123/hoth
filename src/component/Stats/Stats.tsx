import styled from "styled-components";

const StyledStats = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const StyledH1 = styled.h1`
    font-size: 40px;
`

export const Stats = () => {
    return  <StyledStats>
        <div>
            <h3><strong>This Week</strong></h3>
            <StyledH1><strong>8</strong></StyledH1>
        </div>
        <div>
            <h3><strong>Total</strong></h3>
            <StyledH1><strong>88</strong></StyledH1>
        </div>
    </StyledStats>
}