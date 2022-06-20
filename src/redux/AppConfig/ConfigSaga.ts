import { put, takeEvery } from "@redux-saga/core/effects";
import IAppConfig from "../../interface/IAppConfig";
import { InitUser } from "../User/UserActions";
import { InitConfigComplete, InitConfig } from "./ConfigActions";

export function* initConfigHandler(action: any) {
    try {
        console.log(process.env);
        yield put({
            type: InitConfigComplete, 
            payload: {
                patientsURL: process.env.REACT_APP_PATIENTS_URL,
                widgetsURL: process.env.REACT_APP_WIDGETS_URL,
                operationsURL: process.env.REACT_APP_OPERATIONS_URL,
                institutionsURL: process.env.REACT_APP_INSTITUTIONS_URL
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