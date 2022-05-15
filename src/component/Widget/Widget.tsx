import styled from "styled-components";
import WidgetBody from "../WidgetBody/WidgetBody";
import WidgetHead from "../WidgetHead/WidgetHead";

const StyledWidget = styled.div`
    width: 100%;
    height: 100%;
`;

export interface IWidgetProps {
    viewId: string;
    widgetId: string;
}

const Widget = ({viewId, widgetId}: IWidgetProps) => {
    return <StyledWidget>
        <WidgetHead viewId={viewId} widgetId={widgetId} />
        <WidgetBody viewId={viewId} widgetId={widgetId} />
    </StyledWidget>   
}

export default Widget;