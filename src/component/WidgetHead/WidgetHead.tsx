import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";

const StyledWidgetHead = styled.div`
    background: #fff;
`;

export interface IWidgetHeadProps {
    viewId: string;
    widgetId: string;
}

const WidgetHead = ({viewId, widgetId}: IWidgetHeadProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    return <StyledWidgetHead>
        <h5>{widget?.name}</h5>
    </StyledWidgetHead>
}

export default WidgetHead;