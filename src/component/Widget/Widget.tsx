import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EventType, IEvent } from "../../interface/IEvent";
import { IInput, InputType } from "../../interface/IInput";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import { UpdateWidgetDimensions } from "../../redux/Workspace/WorkspaceActions";
import WidgetBody from "../WidgetBody/WidgetBody";
import WidgetHead from "../WidgetHead/WidgetHead";

const StyledWidget = styled.div<{maximized: boolean}>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: ${props => props.maximized ? "absolute" : "static"};
    z-index: 2;
    left: 0;
    top: 0;
`;

export interface IWidgetProps {
    viewId: string;
    widgetId: string;
}

const Widget = ({viewId, widgetId}: IWidgetProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const maximize: IInput | undefined = widget?.inputs?.find(x => x.type === InputType.Maximize);
    const widgetRef: any = useRef<any>()
    const dispatch = useDispatch()
    const event: IEvent | null = useSelector((state: IState) => state?.eventManager?.event)
    useEffect(() => {
        if (event?.type === EventType.Resize) {
            if (viewId !== event?.meta?.viewId) return;
            if (event?.meta?.widgetId && widgetId !== event?.meta?.widgetId) return;
            const rect = widgetRef?.current?.getBoundingClientRect()
            dispatch({type: UpdateWidgetDimensions, payload: {viewId, widgetId, width: rect?.width, height: rect?.height}})
        }
    }, [event])
    return <StyledWidget ref={widgetRef} maximized={maximize?.value}>
        <WidgetHead viewId={viewId} widgetId={widgetId} />
        <WidgetBody viewId={viewId} widgetId={widgetId} />
    </StyledWidget>   
}

export default Widget;