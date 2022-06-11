import { Button, Input, notification, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IPatient } from "../../interface/IPatient";
import { IState } from "../../interface/IState";
import { EditOperation, EditPatient, GetOperation, GetPatients } from "../../redux/EditPatient/EditPatientActions";

export interface IEditPatientProps {
    viewId: string;
}

const StyledEditPatient = styled.div`
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

const StyledSubheader = styled.h5`
    font-size: 14px;
    margin: 0;
    font-weight: 500;
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
    margin-bottom: 5px;
`

const StyledDivWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledHeader = styled.h2`
    margin-bottom: 5px;
`;

const EditPatientComp = ({viewId}: IEditPatientProps) => {
    const view = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId))
    const institutions = useSelector((state: IState) => state?.dataManager?.institutions);
    const patients: IPatient[] = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.patients)
    const operation: any = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.operation)
    const dispatch = useDispatch();
    const [institution, setInstitution] = useState<number>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [numInsertions, setNumInsertions] = useState<number>();
    const [numCorrectInsertions, setNumCorrectInsertions] = useState<number>();
    const [ctScan, setCtScan] = useState<any>();
    const [confidence, setConfidence] = useState<number>();
    const [patient, setPatient] = useState<number>();
    useEffect(() => {
        const p = patients?.find(x => x?.id === patient);
        setFirstName(p?.firstName);
        setLastName(p?.lastName);
    }, [patient])
    useEffect(() => {
        setNumInsertions(operation?.numInsertions);
        setNumCorrectInsertions(operation?.numCorrectInsertions);
        setConfidence(operation?.confidence)
    }, [operation])
    useEffect(() => {
        if (view?.meta?.data?.editPatient?.isSuccess === true) {
            dispatch({type: EditOperation, payload: {
                viewId,
                operation: {
                    operation_id: operation?.id,
                    numInsertions, 
                    numCorrectInsertions, 
                    confidence
                }
            }})
        } else if (view?.meta?.data?.editPatient?.isSuccess === false) {
            notification.open({
                type: "error",
                message: 'Edit Patient Failed',
                description: "Failed to edit patient."
            });
        }
    }, [view?.meta?.data?.editPatient])
    useEffect(() => {
        if (view?.meta?.data?.editOperation?.isSuccess === true) {
            notification.open({
                type: "success",
                message: 'Edited Patient',
                description: "Successfully edited patient."
            });
            clearInputs()
        } else if (view?.meta?.data?.editOperation?.isSuccess === false) {
            notification.open({
                type: "error",
                message: 'Edit Patient Failed',
                description: "Failed to edit patient."
            });
        }
    }, [view?.meta?.data?.editOperation])
    const editPatient = () => { 
        dispatch({type: EditPatient, payload: {
            viewId,
            patient: {
                patient_id: patient,
                firstName,
                lastName
            }
        }})
    }
    const clearInputs = () => {
        setPatient(undefined)
        setInstitution(undefined);
        setFirstName(undefined);
        setLastName(undefined);
        setNumInsertions(undefined);
        setNumCorrectInsertions(undefined);
        setConfidence(undefined);
    }
    const isValid = () => {
        return firstName?.trim() && lastName?.trim() &&
        numInsertions && numInsertions >= 0 && 
        numCorrectInsertions && numCorrectInsertions >= 0 && 
        patient && institution && confidence
    }
    const handleInstitution = (value: any) => {
        dispatch({type: GetPatients, payload: {viewId: viewId, institution_id: value}})
        setInstitution(value);
    }
    const handlePatient = (value: any) => {
        dispatch({type: GetOperation, payload: {viewId: viewId, patient_id: value}})
        setPatient(value);
    }
    const handleFirstName = (e: any) => {
        setFirstName(e?.target?.value)
    }
    const handleLastName = (e: any) => {
        setLastName(e?.target?.value)
    }
    const handleInsertsions = (e: any) => {
        setNumInsertions(parseInt(e?.target?.value));
    }
    const handleCorrectInsertsions = (e: any) => {
        setNumCorrectInsertions(parseInt(e?.target?.value));
    }
    const handleConfidence = (e: any) => {
        setConfidence(e?.target?.value)
    }
    return <StyledEditPatient>
        <StyledHeader><strong>Edit Patient</strong></StyledHeader>
        <StyledSubheader>Patient Info</StyledSubheader>
        <StyledWrapper>
            <StyledDiv>
                <StyledSelect filterOption={(input: any, option: any) => option?.label?.toLowerCase()?.includes(input?.trim()?.toLowerCase())} options={institutions?.map(x => ({label: x?.name, value: x?.id}))} showSearch allowClear value={institution} onChange={handleInstitution} size="small" placeholder={<span style={{color: "#6f6f6f"}}>{"Select Institution"}</span>}/ >
            </StyledDiv>
            <StyledDiv>
                <StyledSelect filterOption={(input: any, option: any) => option?.label?.toLowerCase()?.includes(input?.trim()?.toLowerCase())} options={patients?.map(x => ({label: `${x?.firstName} ${x?.lastName}`, value: x?.id}))} showSearch allowClear value={patient} onChange={handlePatient} size="small" placeholder={<span style={{color: "#6f6f6f"}}>{"Select Patient"}</span>}/ >
            </StyledDiv>
        </StyledWrapper>
        <StyledWrapper>
            <StyledDiv>
                <StyledInput value={firstName} onChange={handleFirstName} placeholder={"First Name"}/>
            </StyledDiv>
            <StyledDiv>
                <StyledInput value={lastName} onChange={handleLastName} placeholder={"Last Name"}/>
            </StyledDiv>
        </StyledWrapper>
        <StyledSubheader>Inserstion Stats</StyledSubheader>
        <StyledWrapper>
            <StyledDiv>
                <StyledInput value={numInsertions} onChange={handleInsertsions} type={"number"} placeholder={"# Insertions"}/>
            </StyledDiv>
            <StyledDiv>
                <StyledInput value={numCorrectInsertions} onChange={handleCorrectInsertsions} type={"number"} placeholder={"# Correct Insertions"}/>
            </StyledDiv>
        </StyledWrapper>
        <StyledWrapper>
            <StyledDiv>
                <StyledLabel>Upload CT Scan</StyledLabel>
                <StyledFileInput size="small" type={"file"} multiple title="Upload CT Scan" />
            </StyledDiv>
            <StyledDiv>
                <StyledLabel>Confidence (1 = none, 5 = most confident)</StyledLabel>
                <Radio.Group value={confidence} onChange={handleConfidence}>
                    <Radio value={1}>1</Radio>
                    <Radio value={2}>2</Radio>
                    <Radio value={3}>3</Radio>
                    <Radio value={4}>4</Radio>
                    <Radio value={5}>5</Radio>
                </Radio.Group>
            </StyledDiv>
        </StyledWrapper>
        <StyledDiv>
            <StyledButton size="small" type="primary" disabled={!isValid()} onClick={editPatient}>Update</StyledButton>
        </StyledDiv>
    </StyledEditPatient>
}

export default EditPatientComp;