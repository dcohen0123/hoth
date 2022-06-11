import { call, put, takeEvery } from "@redux-saga/core/effects";
import { IPatient } from "../../interface/IPatient";
import { fetchGet } from "../../util/RestUtils";
import { GetPatients, GetPatientsComplete } from "./EditPatientActions";

export function* getPatientsHandler(action: any) {
    try {
        const response: Promise<any> = yield call(fetchGet, `http://localhost:5000/patients?institution_id=${action?.payload?.institution_id}`);
        const data: {patients: IPatient[]} = yield response;
        yield put({type: GetPatientsComplete, payload: {viewId: action.payload.viewId, data}});
    } catch (e) {
        console.error(e);
    }
}

export function* getPatientsListener() {
    yield takeEvery(GetPatients, getPatientsHandler);
}

export function* getOperationHandler(action: any) {
    try {
        const response: Promise<any> = yield call(fetchGet, `http://localhost:5000/patients?institution_id=${action?.payload?.institution_id}`);
        const data: {patients: IPatient[]} = yield response;
        yield put({type: GetPatientsComplete, payload: {viewId: action.payload.viewId, data}});
    } catch (e) {
        console.error(e);
    }
}

export function* getOperationListener() {
    yield takeEvery(GetPatients, getPatientsHandler);
}