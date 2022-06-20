import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";

const StyledInstitutionContact = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledInfo = styled.div`
    label {
        margin-right: 3px;
    }
`

const StyledSplit = styled.div`
    width: 1px;
    height: 80px;
    background: #d9d9d9;
    margin: 3px;
`

export interface IInstitutionContact {
    viewId: string;
    widgetId: string;
}

const InstitutionContact = ({viewId, widgetId}: IInstitutionContact) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    return  <StyledInstitutionContact>
        <div>{widget?.data?.contact?.first_name + " " + widget?.data?.contact?.last_name + " " + widget?.data?.contact?.title}</div>
        <StyledSplit />
        <StyledInfo>
            <div><label><strong>Email:</strong></label><span>{widget?.data?.contact?.email}</span></div>
            <div><label><strong>Phone:</strong></label><span>{widget?.data?.contact?.phone}</span></div>
        </StyledInfo>
    </StyledInstitutionContact>
}

export default InstitutionContact;