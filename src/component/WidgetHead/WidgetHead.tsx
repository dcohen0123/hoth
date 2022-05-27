import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import WidgetInputs from "../../WidgetInputs/WidgetInputs";

const StyledWidgetHead = styled.div`
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding-left: 2px;
`;

const StyledHeader = styled.h5`
    font-weight: 800;
    font-size: 12px;
    margin: 0;
    position: relative;
    top: 1px;
`;

const StyledInputs = styled.div``;

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
        <StyledHeader>{widget?.name}</StyledHeader>
        <WidgetInputs viewId={viewId} widgetId={widgetId} />
    </StyledWidgetHead>
}

export default WidgetHead;