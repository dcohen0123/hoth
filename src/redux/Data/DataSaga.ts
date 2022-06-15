import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { IInstitution } from "../../interface/IInstitution";
import { IState } from "../../interface/IState";
import { fetchGet } from "../../util/RestUtils";
import { InitWorkspace } from "../Workspace/WorkspaceActions";
import { GetInstitutions, InitData } from "./DataActions";

export function* initDataHandler(action: any) {
    try {
        const institutionResponse: Promise<any> = yield call(fetchGet, "http://localhost:5000/institutions") 
        const data: {institutions: IInstitution[]} = yield institutionResponse;
        yield put({type: GetInstitutions, payload: data?.institutions});
        // TODO - Fetch dashboards / reports JSON and populate here.
        yield put({type: InitWorkspace});
    } catch (e) {
        console.error(e);
    }
}

export function* initDataListener() {
    yield takeEvery(InitData, initDataHandler);
}