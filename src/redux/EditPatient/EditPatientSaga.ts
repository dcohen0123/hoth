import { call, put, takeEvery } from "@redux-saga/core/effects";
import { IPatient } from "../../interface/IPatient";
import { fetchGet, fetchPut } from "../../util/RestUtils";
import { EditOperation, EditOperationComplete, EditPatient, EditPatientComplete, GetOperation, GetOperationComplete, GetPatients, GetPatientsComplete } from "./EditPatientActions";

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
        const response: Promise<any> = yield call(fetchGet, `http://localhost:5000/operations?patient_id=${action?.payload?.patient_id}`);
        const data: {operation: any} = yield response;
        yield put({type: GetOperationComplete, payload: {viewId: action.payload.viewId, data}});
    } catch (e) {
        console.error(e);
    }
}

export function* getOperationListener() {
    yield takeEvery(GetOperation, getOperationHandler);
}

export function* editPatientHandler(action: any) {
    try {
        const response: Promise<any> = yield call(fetchPut, `http://localhost:5000/patients/${action?.payload?.patient?.patient_id}`, action.payload?.patient);
        const data: {isSuccess: boolean} = yield response;
        yield put({type: EditPatientComplete, payload: {viewId: action.payload.viewId, data}});
    } catch (e) {
        console.error(e);
    }
}

export function* editPatientListener() {
    yield takeEvery(EditPatient, editPatientHandler);
}

export function* editOperationHandler(action: any) {
    try {
        const response: Promise<any> = yield call(fetchPut, `http://localhost:5000/operations/${action?.payload?.operation?.operation_id}`, action.payload?.operation);
        const data: {isSuccess: boolean} = yield response;
        yield put({type: EditOperationComplete, payload: {viewId: action.payload.viewId, data}});
    } catch (e) {
        console.error(e);
    }
}

export function* editOperationListener() {
    yield takeEvery(EditOperation, editOperationHandler);
}