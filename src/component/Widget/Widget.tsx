import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EventType, IEvent } from "../../interface/IEvent";
import { IState } from "../../interface/IState";
import { UpdateWidgetDimensions } from "../../redux/Workspace/WorkspaceActions";
import WidgetBody from "../WidgetBody/WidgetBody";
import WidgetHead from "../WidgetHead/WidgetHead";

const StyledWidget = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export interface IWidgetProps {
    viewId: string;
    widgetId: string;
}

const Widget = ({viewId, widgetId}: IWidgetProps) => {
    const widgetRef: any = useRef<any>()
    const dispatch = useDispatch()
    const event: IEvent | null = useSelector((state: IState) => state?.eventManager?.event)
    useEffect(() => {
        if (event?.type === EventType.Resize) {
            if (viewId !== event?.meta?.viewId) return;
            const rect = widgetRef?.current?.getBoundingClientRect()
            dispatch({type: UpdateWidgetDimensions, payload: {viewId, widgetId, width: rect?.width, height: rect?.height}})
        }
    }, [event])
    return <StyledWidget ref={widgetRef}>
        <WidgetHead viewId={viewId} widgetId={widgetId} />
        <WidgetBody viewId={viewId} widgetId={widgetId} />
    </StyledWidget>   
}

export default Widget;