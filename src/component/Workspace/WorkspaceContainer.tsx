import { connect } from "react-redux";
import { IState } from "../../interface/IState";
import Workspace from "./Workspace";

function mapStateToProps(state: IState) {
    const views = state?.workspaceManager?.selected?.views;
    const nav = state?.navManager?.selected;
    return { views, nav };
}

export default connect(mapStateToProps)(Workspace)