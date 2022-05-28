import { Button, Input, Radio } from "antd";
import styled from "styled-components";

const StyledEditPatient = styled.div`
    width: 100%;
    height: 100%;
`;

const StyledInput = styled(Input)`
    width: 180px;
    ::placeholder {
        color: #000;
    }
`

const StyledDiv = styled.div`
    margin-bottom: 8px;
`;

const StyledLabel = styled.label`
    margin-bottom: 5px;
    display: block;
`

const StyledButton = styled(Button)`
    margin-top: 8px;
`

const EditPatient = () => {
    return <StyledEditPatient>
        <StyledDiv>
            <StyledInput placeholder={"Patient ID"}/>
        </StyledDiv>
        <StyledDiv>
            <StyledInput type={"number"} placeholder={"# Insertions"}/>
        </StyledDiv>
        <StyledDiv>
            <StyledInput type={"number"} placeholder={"# Correct Insertions"}/>
        </StyledDiv>
        <StyledDiv>
            <StyledLabel><strong>Confidence (1 = none, 5 = most confident)</strong></StyledLabel>
            <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={5}>5</Radio>
            </Radio.Group>
        </StyledDiv>
        <StyledDiv>
            <StyledButton type="primary">Submit</StyledButton>
        </StyledDiv>
    </StyledEditPatient>
}

export default EditPatient;