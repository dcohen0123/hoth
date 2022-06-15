import { put, takeEvery } from "@redux-saga/core/effects";
import { InitUser } from "../User/UserActions";
import { InitHoth } from "./HothActions";

export function* initHothHandler(action: any) {
    try {
        yield put({type: InitUser})
    } catch(e) {
        console.error(e);
    }
}

export function* initHothListener() {
    yield takeEvery(InitHoth, initHothHandler);
}