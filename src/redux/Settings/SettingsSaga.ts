import { takeEvery } from "@redux-saga/core/effects";
import { put } from "redux-saga/effects";
import { InitWorkspace } from "../Workspace/WorkspaceActions";
import { InitSettings } from "./SettingsActions";

export function* initSettingsHandler(action: any) {
    try {
        // TODO - Fetch Settings Info.
        yield put({type: InitWorkspace});
    } catch(e) {

    }
}

export function* initSettingsListener(){
    yield takeEvery(InitSettings, initSettingsHandler);
}