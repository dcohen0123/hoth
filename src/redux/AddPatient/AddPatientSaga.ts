import { call, put, takeEvery } from "@redux-saga/core/effects";
import { fetchPost } from "../../util/RestUtils";
import { AddNewPatient, AddNewPatientComplete } from "./AddPatientActions";

export function* addNewPatientHandler(action: any) {
    try {
        const response: Promise<any> = yield call(fetchPost, "http://localhost:5000/patients", action.payload.patient);
        const data: {isSuccess: boolean} = yield response;
        yield put({type: AddNewPatientComplete, payload: {viewId: action.payload.viewId, data}});
    } catch (e) {
        console.error(e);
    }
}

export function* addNewPatientListener() {
    yield takeEvery(AddNewPatient, addNewPatientHandler);
}