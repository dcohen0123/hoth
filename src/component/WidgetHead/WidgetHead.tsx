import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import WidgetInputs from "../WidgetInputs/WidgetInputs";

const StyledWidgetHead = styled.div`
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding-left: 2px;
    height: 21px;
`;

const StyledHeader = styled.div`
    &> span {
        margin-right: 7px;
    }
`;

const StyledKey = styled.span`
    margin-right: 4px;
`

const StyledName = styled.h5`
    font-weight: 800;
    position: relative;
    bottom: 1px;
    display: inline-block;
    margin-right: 6px;
    font-size: 13px;
`;

export interface IWidgetHeadProps {
    viewId: string;
    widgetId: string;
}

export const StyledMuiIcon = styled.div`
    svg {
        width: 19px !important;
        height: 19px !important;
    }
`;


export const StyledEntypoIcon = styled.div`
    svg {
        width: 14px !important;
        height: 14px !important;
    }
`;

export const StyledInput = styled.div`
    display: inline-block;
    margin-right: 2px;
    vertical-align: top;
`

const WidgetHead = ({viewId, widgetId}: IWidgetHeadProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    return <StyledWidgetHead>
        <StyledHeader><StyledName>{widget?.name}</StyledName>{widget?.drill?.map(x => <span><StyledKey>{`${x.name} -`}</StyledKey><span><strong>{x.value}</strong></span></span>)}</StyledHeader>
        <WidgetInputs viewId={viewId} widgetId={widgetId} />
    </StyledWidgetHead>
}

export default WidgetHead;