import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import IAppConfig from "../../interface/IAppConfig";
import { IState } from "../../interface/IState";
import { fetchPost } from "../../util/RestUtils";
import { AddNewPatient, AddNewPatientComplete, AddOperation, AddOperationComplete } from "./AddPatientActions";

export function* addNewPatientHandler(action: any) {
    try {
        const config: IAppConfig = yield select((state: IState) => state?.configManager?.config)
        const response: Promise<any> = yield call(fetchPost, config?.patientsURL, action.payload.patient);
        const data: {patient_id: number} = yield response;
        yield put({type: AddNewPatientComplete, payload: {viewId: action.payload.viewId, data}});
    } catch (e) {
        console.error(e);
    }
}

export function* addNewPatientListener() {
    yield takeEvery(AddNewPatient, addNewPatientHandler);
}

export function* addOperationHandler(action: any) {
    try {
        const config: IAppConfig = yield select((state: IState) => state?.configManager?.config)
        const response: Promise<any> = yield call(fetchPost, config?.operationsURL, action.payload.operation);
        const data: {isSuccess: boolean} = yield response;
        yield put({type: AddOperationComplete, payload: {viewId: action.payload.viewId, data}});
    } catch (e) {
        console.error(e);
    }
}

export function* addOperationListener() {
    yield takeEvery(AddOperation, addOperationHandler);
}