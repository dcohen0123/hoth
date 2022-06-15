import { put, select, takeEvery } from "@redux-saga/core/effects";
import { IDashboard } from "../../interface/IDashboard";
import { IState } from "../../interface/IState";
import { AddDashboard, RunDashboard } from "../Dashboard/DashboardActions";
import { InitWorkspace, SelectWorkspace } from "./WorkspaceActions";
import { v4 as uuidv4 } from 'uuid';

export function* initWorkspaceHandler(action: any) {
    try {
        // TODO - Fetch workspaces and populate list of workspaces / set default workspace
        yield put({type: SelectWorkspace, payload: {id: "workspace", name: "Workspace", layout: null, views: []}});
        const dashboards: IDashboard[] = yield select((state: IState) => state.dataManager?.dashboards);
        // Run workspace views.
        for (let i: number = 0; i < dashboards?.length; i++) {
            const viewId: string = uuidv4();
            yield put({type: AddDashboard, payload: {viewId, dashboardId: dashboards?.[i]?.id}});
            yield put({type: RunDashboard, payload: {viewId}});
        }
    } catch(e) {
        console.error(e);
    }
}

export function* initWorkspaceListener() {
    yield takeEvery(InitWorkspace, initWorkspaceHandler);
}