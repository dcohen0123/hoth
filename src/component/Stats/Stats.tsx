import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";

export interface IStatsProps {
    viewId: string;
    widgetId: string;
}

const StyledStats = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const StyledH1 = styled.h1`
    font-size: 30px;
`

export const Stats = ({viewId, widgetId}: IStatsProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    return  <StyledStats>
        <div>
            <h4><strong>This Week</strong></h4>
            <StyledH1><strong>{widget?.data?.week}</strong></StyledH1>
        </div>
        <div>
            <h4><strong>Total</strong></h4>
            <StyledH1><strong>{widget?.data?.total}</strong></StyledH1>
        </div>
    </StyledStats>
}