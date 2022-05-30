import { Button, Input, Radio, Select } from "antd";
import styled from "styled-components";

const StyledAddPatient = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
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
        height: 25px !important;
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
    margin-bottom: 8px;
    width: 100%;
    .ant-radio-inner {
        border: 1px solid #c2c2c2 !important;
    }
`;

const StyledLabel = styled.label`
    margin-bottom: 5px;
    display: block;
`

const StyledButtonWrapper = styled.div`
    text-align: center;
    width: 100%;
`

const StyledButton = styled(Button)`
    margin-top: 8px;
`

const AddPatient = () => {
    return <StyledAddPatient>
        <div>
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
                <StyledLabel><strong>Upload CT Scan</strong></StyledLabel>
                <StyledFileInput type={"file"} multiple title="Upload CT Scan" />
            </StyledDiv>
            <StyledDiv>
                <StyledLabel><strong>Confidence (1 = none, 5 = most confident)</strong></StyledLabel>
                <Radio.Group style={{display: "flex", justifyContent: "center"}}>
                    <Radio value={1}>1</Radio>
                    <Radio value={2}>2</Radio>
                    <Radio value={3}>3</Radio>
                    <Radio value={4}>4</Radio>
                    <Radio value={5}>5</Radio>
                </Radio.Group>
            </StyledDiv>
            <StyledDiv>
                <StyledButtonWrapper>
                    <StyledButton type="primary">Submit</StyledButton>
                </StyledButtonWrapper>
            </StyledDiv>
        </div>
        <div>
            {/* <img style={{marginLeft: 100}} width={500} src="https://i.ytimg.com/vi/6M9jvvdV470/maxresdefault.jpg" /> */}
        </div>
        
    </StyledAddPatient>
}

export default AddPatient;