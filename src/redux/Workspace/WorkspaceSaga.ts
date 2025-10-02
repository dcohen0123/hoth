import { put, takeEvery } from "@redux-saga/core/effects";
import { ViewType } from "../../interface/IView";
import { AddView, InitWorkspace, SelectWorkspace } from "./WorkspaceActions";

export function* initWorkspaceHandler() {
    try {
        // TODO - Fetch workspaces and populate list of workspaces / set default workspace
        yield put({type: SelectWorkspace, payload: {id: "workspace", name: "Workspace", layout: null, views: []}});
        yield put({type: AddView, payload: {id: 'workflow', name: 'Workflow', type: ViewType.WorkflowManager}});
    } catch(e) {
        console.error(e);
    }
}

export function* initWorkspaceListener() {
    yield takeEvery(InitWorkspace, initWorkspaceHandler);
}