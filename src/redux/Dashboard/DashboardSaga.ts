import moment from "moment";
import { call, put, select, takeEvery } from "redux-saga/effects";
import IAppConfig from "../../interface/IAppConfig";
import { IDashboard } from "../../interface/IDashboard";
import { IInput, InputType } from "../../interface/IInput";
import { IInstitution } from "../../interface/IInstitution";
import { IState } from "../../interface/IState";
import { IView, ViewType } from "../../interface/IView";
import { IWidget } from "../../interface/IWidget";
import { fetchPost } from "../../util/RestUtils";
import { AddView } from "../Workspace/WorkspaceActions";
import { AddDashboard, RunDashboard, RunWidget, RunWidgetComplete, ToggleWidgetLoading } from "./DashboardActions";

export function* runDashboardHandler(action: any){
    try {
        const view: IView = yield select((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === action.payload?.viewId));
        for (let i: number = 0; i < view?.meta?.widgets?.length; i++){
            yield put({type: RunWidget, payload: {viewId: view?.id, widgetId: view?.meta?.widgets?.[i]?.id}})
        }
    } catch(e) {
        console.error(e);
    }
}

export function* runDashboardListener(){
    yield takeEvery(RunDashboard, runDashboardHandler)
}

export function* runWidgetHandler(action: any){
    try {
        const config: IAppConfig = yield select((state: IState) => state?.configManager?.config)
        const view: IView = yield select((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === action.payload?.viewId));
        const widget: IWidget = view?.meta?.widgets?.find((x: IWidget) => x?.id === action.payload?.widgetId) as IWidget
        const request: any = {drill: widget?.drill};
        view?.meta?.inputs?.forEach((x: IInput) => request[x?.id] = x?.value);
        widget?.inputs?.forEach((x: IInput) => request[x?.id] = x?.value);
        yield put({type: ToggleWidgetLoading, payload: {viewId: view?.id, widgetId: widget?.id, loading: true}});
        const response: Promise<any> = yield call(fetchPost, `${config?.widgetsURL}/${widget?.fn}`, request)
        const data: Object = yield response
        yield put({type: RunWidgetComplete, payload: {viewId: view?.id, widgetId: widget?.id, data}});
        yield put({type: ToggleWidgetLoading, payload: {viewId: view?.id, widgetId: widget?.id, loading: false}});
    } catch(e) {
        console.error(e);
    }
}

export function* runWidgetListener(){
    yield takeEvery(RunWidget, runWidgetHandler);
}

export function* addDashboardHandler(action: any){
    try {
        const selected: IDashboard = yield select((state: IState) => state?.dataManager?.dashboards?.find(x => x?.id === action.payload?.dashboardId));
        const institutions: IInstitution[] = yield select((state: IState) => state?.dataManager?.institutions);
        const dashboard = JSON.parse(JSON.stringify(selected));
        for (let i: number = 0; i < dashboard?.inputs?.length; i++) {
            if (dashboard?.inputs?.[i]?.type === InputType.Institution) {
                dashboard.inputs[i].value = institutions?.[0]?.id;
            } else if (dashboard?.inputs?.[i]?.type === InputType.DateRange) {
                dashboard.inputs[i].value = [moment().startOf("year").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];
            }
        }
        yield put({type: AddView, payload: {id: action.payload?.viewId, name: dashboard?.name, type: ViewType.Dashboard, meta: dashboard}});
    } catch(e) {
        console.error(e);
    }
}

export function* addDashboardListener(){
    yield takeEvery(AddDashboard, addDashboardHandler);
}