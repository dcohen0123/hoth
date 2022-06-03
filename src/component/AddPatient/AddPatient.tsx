import { Button, Input, Radio, Select } from "antd";
import styled from "styled-components";

const StyledAddPatient = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 5px;
`;

const StyledInput = styled(Input)`
    width: 100%;
    padding 0 5px;
    border: 1px solid #c2c2c2;
    ::placeholder {
        color: #6f6f6f;
    }
`

const StyledSelect = styled(Select)`
    margin: 0;
    width: 100%;
    border-radius: 5px !important;
    color: #000 !important;
    .ant-select-selector {
        border: 1px solid #c2c2c2 !important;
    }
`

const StyledFileInput = styled(Input)`
    width: 100%;
    padding 0 5px;
    border: 1px solid #c2c2c2;
    input::placeholder {
        color: #6f6f6f;
    }
`

const StyledDiv = styled.div`
    margin-bottom: 5px;
    width: calc(50% - 2.5px);
    vertical-align: top;
    display: inline-block;
    .ant-radio-inner {
        border: 1px solid #c2c2c2 !important;
    }
`;

const StyledLabel = styled.label`
    margin-bottom: 5px;
    display: block;
`

const StyledButton = styled(Button)`
    margin-top: 5px;
`

const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledHeader = styled.h2`
    margin-bottom: 5px;
`;

const AddPatient = () => {
    return <StyledAddPatient>
        <StyledHeader><strong>New Patient</strong></StyledHeader>
        <StyledWrapper>
            <StyledDiv>
                <StyledSelect  size="small" placeholder={<span style={{color: "#6f6f6f"}}>{"Select Instition"}</span>}/ >
            </StyledDiv>
            <StyledDiv>
                <StyledInput placeholder={"Patient ID"}/>
            </StyledDiv>
        </StyledWrapper>
        <StyledWrapper>
            <StyledDiv>
                <StyledInput  type={"number"} placeholder={"# Insertions"}/>
            </StyledDiv>
            <StyledDiv>
                <StyledInput  type={"number"} placeholder={"# Correct Insertions"}/>
            </StyledDiv>
        </StyledWrapper>
        <StyledWrapper>
            <StyledDiv>
                <StyledLabel>Upload CT Scan</StyledLabel>
                <StyledFileInput size="small" type={"file"} multiple title="Upload CT Scan" />
            </StyledDiv>
            <StyledDiv>
                <StyledLabel>Confidence (1 = none, 5 = most confident)</StyledLabel>
                <Radio.Group>
                    <Radio value={1}>1</Radio>
                    <Radio value={2}>2</Radio>
                    <Radio value={3}>3</Radio>
                    <Radio value={4}>4</Radio>
                    <Radio value={5}>5</Radio>
                </Radio.Group>
            </StyledDiv>
        </StyledWrapper>
        <StyledDiv>
            <StyledButton size="small" type="primary">Submit</StyledButton>
        </StyledDiv>
    </StyledAddPatient>
}

export default AddPatient;