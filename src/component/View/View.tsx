import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { ViewType } from "../../interface/IView";
import Dashboard from "../Dashboard/Dashboard";

export interface IViewProps {
    viewId: string;
}

export const viewMap: Map<ViewType, JSX.Element> = new Map<ViewType, JSX.Element>([
    [ViewType.Dashboard, <Dashboard viewId={""} />],
])

const StyledView = styled.div`
    width: 100%;
    height: 100%;
`;

const View = ({viewId}: IViewProps) => {
    const workspace = useSelector((state: IState) => state.workspaceManager?.selected);
    const view = workspace?.views?.find(x => x?.id === viewId);
    const Elmt: any = view?.type ? viewMap?.get(view?.type) : null;
    // return <Elmt viewId={viewId} />;
    return <StyledView><Dashboard viewId={""} /></StyledView>;
}


export default View;