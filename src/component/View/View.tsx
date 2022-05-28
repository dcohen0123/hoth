import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { ViewType } from "../../interface/IView";
import Dashboard from "../Dashboard/Dashboard";
import Upload from "../Upload/Upload";

export interface IViewProps {
    viewId: string;
}

export const viewMap: Map<ViewType, any> = new Map<ViewType, any>([
    [ViewType.Dashboard, Dashboard],
    [ViewType.Upload, Upload]
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