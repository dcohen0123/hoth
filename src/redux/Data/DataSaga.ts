import { all, call, put, takeEvery } from "redux-saga/effects";
import { IInstitution } from "../../interface/IInstitution";
import { fetchGet } from "../../util/RestUtils";
import { GetInstitutions, FetchData } from "./DataActions";

export function* fetchDataHandler(action: any) {
    const institutionResponse: Promise<any> = yield call(fetchGet, "http://localhost:5000/institutions") 
    const data: {institutions: IInstitution[]} = yield institutionResponse;
    yield put({type: GetInstitutions, payload: data.institutions});
}

export function* fetchDataListener() {
    yield takeEvery(FetchData, fetchDataHandler);
}