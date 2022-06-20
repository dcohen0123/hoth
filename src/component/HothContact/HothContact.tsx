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
    height: 70px;
    background: #d9d9d9;
    margin: 0 15px;
`

const StyledDiv = styled.div`
    text-align: center;
    h3 {
        margin: 0;
    }
    img {
        margin-bottom: 5px;
    }
`

export interface IHothContact {
    viewId: string;
    widgetId: string;
}

const HothContact = ({viewId, widgetId}: IHothContact) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    return  <StyledHothContact>
        <StyledDiv>
            <div><img src="/contact.png" width="85px" height="85px" /></div>
            <div><h3>{widget?.data?.contact?.first_name + " " + widget?.data?.contact?.last_name}</h3></div>
            <div>{widget?.data?.contact?.title}</div>
        </StyledDiv>
        <StyledSplit />
        <StyledInfo>
            <div><label><strong>Email:</strong></label><span>{widget?.data?.contact?.email}</span></div>
            <div><label><strong>Phone:</strong></label><span>{widget?.data?.contact?.phone}</span></div>
            <div><label><strong>Most Recent Visit:</strong></label><span>{widget?.data?.schedule?.last_visit ?? "N/A"}</span></div>
            <div><label><strong>Next Visit:</strong></label><span>{widget?.data?.schedule?.next_visit ?? "N/A"}</span></div>
        </StyledInfo>
    </StyledHothContact>
}

export default HothContact;