import { put, takeEvery } from "@redux-saga/core/effects";
import { InitWorkspace, SelectWorkspace } from "./WorkspaceActions";

export function* initWorkspaceHandler() {
    try {
        // TODO - Fetch workspaces and populate list of workspaces / set default workspace
        yield put({type: SelectWorkspace, payload: {id: "workspace", name: "Workspace", layout: null, views: []}});
    } catch(e) {
        console.error(e);
    }
}

export function* initWorkspaceListener() {
    yield takeEvery(InitWorkspace, initWorkspaceHandler);
}