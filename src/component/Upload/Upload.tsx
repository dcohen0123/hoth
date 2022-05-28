import { Tabs } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import AddPatient from '../AddPatient/AddPatient';
import EditPatient from '../EditPatient/EditPatient';

export interface IUploadProps {
    viewId: string;
}

const StyledUpload = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 8px;
`

const StyledTabs = styled.ul`
    margin: 0;
    padding: 0;
`;

const StyledTab = styled.li<{selected?: boolean}>`
    list-style-type: none;
    display: inline-block;
    font-weight: ${props => props.selected ? "bold" : "none"};
    cursor: normal;
    padding: 2px 4px;
    border-radius: 3px;
    user-select: none;
    margin-right: 5px;
    :hover {
        background: ${props => props.selected ? "#eee" : "#f2f2f2"};
    }
    background: ${props => props.selected ? "#eee" : "#fff"}
`;

const StyledContent = styled.div`
    padding-top: 15px;
`;

export enum UploadTab {
    AddPatient="ADD_PATIENT",
    EditPatient="EDIT_PATIENT"
}

export const tabs = [{
    id: UploadTab.AddPatient,
    name: "Add Patient",
}, {
    id: UploadTab.EditPatient,
    name: "Edit Patient",
}]

export const contentMap = new Map<UploadTab, JSX.Element>([
    [UploadTab.AddPatient, <AddPatient />],
    [UploadTab.EditPatient, <EditPatient />]
])

const Upload = ({viewId}: IUploadProps) => {
    const [tab, setTab] = useState<UploadTab>(UploadTab.AddPatient)
    const handleClick = (id: UploadTab) => {
        return (e: any) => setTab(id);
    } 
    return <StyledUpload>
        <StyledTabs>
            {tabs.map(x => <StyledTab onClick={handleClick(x.id)} selected={tab === x.id}>{x.name}</StyledTab>)}
        </StyledTabs>
        <StyledContent>
            {contentMap.get(tab)}
        </StyledContent>
    </StyledUpload>
}

export default Upload;