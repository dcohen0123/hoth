import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";

const StyledHothContact = styled.div`
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

export interface IHothContact {
    viewId: string;
    widgetId: string;
}

const HothContact = ({viewId, widgetId}: IHothContact) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    return  <StyledHothContact>
        <div>{widget?.data?.contact?.first_name + " " + widget?.data?.contact?.last_name + " " + widget?.data?.contact?.title}</div>
        <StyledSplit />
        <StyledInfo>
            {widget?.data?.schedule?.last_visit && <div><label><strong>Most Recent Visit:</strong></label><span>{widget?.data?.schedule?.last_visit}</span></div>}
            {widget?.data?.schedule?.next_visit && <div><label><strong>Next Visit:</strong></label><span>{widget?.data?.schedule?.next_visit}</span></div>}
            {widget?.data?.contact?.email && <div><label><strong>Email:</strong></label><span>{widget?.data?.contact?.email}</span></div>}
            {widget?.data?.contact?.phone && <div><label><strong>Phone:</strong></label><span>{widget?.data?.contact?.phone}</span></div>}
        </StyledInfo>
    </StyledHothContact>
}

export default HothContact;