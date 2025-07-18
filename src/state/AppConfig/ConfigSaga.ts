import { put, takeEvery } from "@redux-saga/core/effects";
import IAppConfig from "../../types/IAppConfig";
import { InitUser } from "../User/UserActions";
import { InitConfigComplete, InitConfig } from "./ConfigActions";

export function* initConfigHandler() {
    try {
        yield put({
            type: InitConfigComplete, 
            payload: {
            } as IAppConfig
        });
        yield put({type: InitUser});
    } catch(e) {
        console.error(e);
    }
}

export function* initConfigListener() {
    yield takeEvery(InitConfig, initConfigHandler);
}