import { takeEvery } from "@redux-saga/core/effects";
import { put } from "redux-saga/effects";
import { InitData } from "../Data/DataActions";
import { InitSettings } from "./SettingsActions";

export function* initSettingsHandler(action: any) {
    try {
        // TODO - Fetch Settings Info.
        yield put({type: InitData})
    } catch(e) {

    }
}

export function* initSettingsListener(){
    yield takeEvery(InitSettings, initSettingsHandler);
}