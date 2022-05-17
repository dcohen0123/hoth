import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainType } from "../../interface/IMain";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import DataGrid from "../DataGrid/DataGrid";

const StyledWidgetBody = styled.div`
    background: #fff;
`;

export interface IWidgetBodyProps {
    viewId: string;
    widgetId: string;
}

export const bodyMap: Map<MainType, JSX.Element> = new Map<MainType, JSX.Element>([
    [MainType.Grid, <DataGrid viewId={""} widgetId={""} />],
    // [WidgetType.Chart, <Chart />]
])

const WidgetBody = ({viewId, widgetId}: IWidgetBodyProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const Elmt: any = bodyMap.get(widget?.main?.type);
    return <StyledWidgetBody>
        <Elmt viewId={viewId} widgetId={widgetId} />
    </StyledWidgetBody>
}

export default WidgetBody;