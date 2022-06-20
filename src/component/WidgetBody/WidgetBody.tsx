import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainType } from "../../interface/IMain";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import { Chart } from "../Chart/Chart";
import Contact from "../HothContact/HothContact";
import DataGrid from "../DataGrid/DataGrid";
import { Stats } from "../Stats/Stats";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const StyledWidgetBody = styled.div`
    background: #fff;
    flex: 1;
    position: relative;
`;

const StyledDiv = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
`;

export interface IWidgetBodyProps {
    viewId: string;
    widgetId: string;
}

export const StyledSpan = styled.span`
    margin-right: 10px;
`;

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
        {widget?.loading ? <StyledDiv><StyledSpan>Loading</StyledSpan><Spin indicator={<LoadingOutlined style={{ fontSize: 22 }} spin />} /></StyledDiv> : null}
        {Elmt ? <Elmt viewId={viewId} widgetId={widgetId} /> : null}
    </StyledWidgetBody>
}

export default WidgetBody;