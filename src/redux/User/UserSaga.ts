import { takeEvery } from "@redux-saga/core/effects";
import { put } from "redux-saga/effects";
import { InitSettings } from "../Settings/SettingsActions";
import { InitUser } from "./UserActions";

export function* initUserHandler(action: any) {
    try {
        //TODO - Fetch User Info.
        yield put({type: InitSettings})
    } catch(e) {

    }
}

export function* initUserListener(){
    yield takeEvery(InitUser, initUserHandler);
}