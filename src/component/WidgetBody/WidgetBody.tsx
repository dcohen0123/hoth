import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { IWidget, WidgetType } from "../../interface/IWidget";
import DataGrid from "../DataGrid/DataGrid";

const StyledWidgetBody = styled.div`
    background: #fff;
`;

export interface IWidgetBodyProps {
    viewId: string;
    widgetId: string;
}

export const bodyMap: Map<WidgetType, JSX.Element> = new Map<WidgetType, JSX.Element>([
    [WidgetType.Grid, <DataGrid viewId={""} widgetId={""} />],
    // [WidgetType.Chart, <Chart />]
])

const WidgetBody = ({viewId, widgetId}: IWidgetBodyProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const Elmt: any = bodyMap.get(widget?.type);
    return <StyledWidgetBody>
        <Elmt viewId={viewId} widgetId={widgetId} />
    </StyledWidgetBody>
}

export default WidgetBody;