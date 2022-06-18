import styled from "styled-components";

const StyledProgressBar = styled.div<{percent: number}>`
    margin-top: 5px;
    width: 100%;
    height: 15px;
    border: 1px solid #ccc;
    border-radius: 30px;
    background: ${props => props?.percent > .5 ? `linear-gradient(to right, #51c734ff ${props?.percent * 100}%, white ${props?.percent * 100}% 100%)` : `linear-gradient(to right, rgb(222, 109, 99) ${props?.percent * 100}%, #fff ${props?.percent * 100}% 100%)`}
`;

const ProgressBar = (props: any) => {
    return <StyledProgressBar percent={props?.value} />
}

export default ProgressBar;