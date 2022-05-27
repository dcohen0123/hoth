import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainType } from "../../interface/IMain";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import { Chart } from "../Chart/Chart";
import Contact from "../Contact/Contact";
import DataGrid from "../DataGrid/DataGrid";
import { Stats } from "../Stats/Stats";

const StyledWidgetBody = styled.div`
    background: #fff;
    flex: 1;
`;

export interface IWidgetBodyProps {
    viewId: string;
    widgetId: string;
}

export const bodyMap: Map<MainType, any> = new Map<MainType, any>([
    [MainType.Grid, DataGrid],
    [MainType.Chart, Chart],
    [MainType.Stats, Stats],
    [MainType.Contact, Contact]
])

const WidgetBody = ({viewId, widgetId}: IWidgetBodyProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const Elmt: any = bodyMap.get(widget?.main?.type);
    return <StyledWidgetBody>
        {Elmt ? <Elmt viewId={viewId} widgetId={widgetId} /> : null}
    </StyledWidgetBody>
}

export default WidgetBody;