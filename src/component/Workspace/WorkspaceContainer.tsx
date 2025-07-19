import { connect } from "react-redux";
import { EventType } from "../../types/IEvent";
import { IState } from "../../types/IState";
import { AddEvent } from "../../state/Event/EventAction";
import Workspace from "./Workspace";

function mapStateToProps(state: IState) {
    const views = state?.workspaceManager?.selected?.views;
    const nav = state?.navManager?.selected;
    return { views, nav };
}

const mapDispatchToProps = (dispatch: any) => ({
    resize: (viewId: string) => {
        return dispatch({type: AddEvent, payload: {type: EventType.Resize, meta: {viewId}}})
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)