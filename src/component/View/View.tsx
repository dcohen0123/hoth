import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../types/IState";
import { ViewType } from "../../types/IView";
import WorkflowManager from "../WorkflowManager/WorkflowManager";

export interface IViewProps {
    viewId: string;
}

export const viewMap: Map<ViewType, any> = new Map<ViewType, any>([
    [ViewType.WorkflowManager, WorkflowManager]
])

const StyledView = styled.div`
    width: 100%;
    height: 100%;
`;

const View = ({viewId}: IViewProps) => {
    const workspace = useSelector((state: IState) => state.workspaceManager?.selected);
    const view = workspace?.views?.find(x => x?.id === viewId);
    const Elmt: any = viewMap?.has(view?.type as ViewType) ? viewMap?.get(view?.type as ViewType) : null;
    return <StyledView><Elmt viewId={viewId} /></StyledView>;
}


export default View;