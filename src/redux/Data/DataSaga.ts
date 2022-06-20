import { all, call, put, select, takeEvery } from "redux-saga/effects";
import IAppConfig from "../../interface/IAppConfig";
import { IInstitution } from "../../interface/IInstitution";
import { IState } from "../../interface/IState";
import { fetchGet } from "../../util/RestUtils";
import { InitWorkspace } from "../Workspace/WorkspaceActions";
import { GetDashboards, GetInstitutions, InitData } from "./DataActions";
const dashboard1 = require("../../dashboard/dashboard_1.json");

export function* initDataHandler(action: any) {
    try {
        const config: IAppConfig = yield select((state: IState) => state?.configManager?.config)
        const institutionResponse: Promise<any> = yield call(fetchGet, config?.institutionsURL)
        const data: {institutions: IInstitution[]} = yield institutionResponse;
        yield put({type: GetInstitutions, payload: data?.institutions});
        // TODO - fetch dashboards from backend
        yield put({type: GetDashboards, payload: [dashboard1]});
        yield put({type: InitWorkspace});
    } catch (e) {
        console.error(e);
    }
}

export function* initDataListener() {
    yield takeEvery(InitData, initDataHandler);
}