import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IDashboard } from "../../interface/IDashboard";
import { IState } from "../../interface/IState";
import { IView } from "../../interface/IView";
import Split from "../Split/Split";
export interface IDashboardProps {
    viewId: string;   
}


const Dashboard = ({viewId}: IDashboardProps) => {
    // const view: IView | undefined = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId));
    // const dashboard: IDashboard = view?.meta;
    return <Split direction={"horizontal"}>
        <Split direction={"horizontal"}>
            <Split direction={"vertical"}>
                <div style={{width: "100%", height: "100%", background: "#fff"}}>Widget 1</div>
                <div style={{width: "100%", height: "100%", background: "#fff"}}>Widget 2</div>
            </Split>
            <Split direction={"horizontal"}>
                <div style={{width: "100%", height: "100%", background: "#fff"}}>Widget 3</div>
                {null as any}
            </Split>
        </Split>
        <Split direction={"vertical"}>
            <div style={{width: "100%", height: "100%", background: "#fff"}}>Widget 4</div>
            <div style={{width: "100%", height: "100%", background: "#fff"}}>Widget 5</div>
        </Split>
    </Split>
}

export default Dashboard;