import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { IInstitution } from "../../interface/IInstitution";
import { IState } from "../../interface/IState";
import { fetchGet } from "../../util/RestUtils";
import { AddDashboard, RunDashboard } from "../Dashboard/DashboardActions";
import { GetInstitutions, FetchData } from "./DataActions";
import { v4 as uuidv4 } from 'uuid';
import { IDashboard } from "../../interface/IDashboard";

export function* fetchDataHandler(action: any) {
    try {
        const institutionResponse: Promise<any> = yield call(fetchGet, "http://localhost:5000/institutions") 
        const data: {institutions: IInstitution[]} = yield institutionResponse;
        yield put({type: GetInstitutions, payload: data.institutions});
        const dashboards: IDashboard[] = yield select((state: IState) => state.dataManager?.dashboards);
        const viewId: string = uuidv4();
        yield put({type: AddDashboard, payload: {viewId, dashboardId: dashboards?.[0]?.id}});
        yield put({type: RunDashboard, payload: {viewId}});
    } catch (e) {
        console.error(e);
    }
}

export function* fetchDataListener() {
    yield takeEvery(FetchData, fetchDataHandler);
}