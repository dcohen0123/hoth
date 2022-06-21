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
import { AddDashboard, RunDashboard, RunWidget, RunWidgetComplete, ToggleWidgetLoading, UpdateDashboardInput, UpdateDatePickerInput, UpdateDateRangeInput } from "./DashboardActions";

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
            } else if (dashboard?.inputs?.[i]?.type === InputType.DatePicker) {
                const date: moment.Moment | undefined = datePickerMap?.get(dashboard?.inputs?.[i]?.value);
                const value = [date?.format("YYYY-MM-DD"), moment()?.format("YYYY-MM-DD")];
                const daterange: IInput = dashboard?.inputs?.find((x: IInput) => x?.type === InputType.DateRange);
                daterange.value = value;
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


const datePickerMap = new Map<string, moment.Moment>([
    ["1d", moment().subtract(1, "d")],
    ["1w", moment().subtract(1, "week")],
    ["1m", moment().subtract(1, "month")],
    ["1y", moment().subtract(1, "year")],
    ["ytd", moment().startOf("year")],
    ["max", moment({year: 2022, month: 1, day: 1})]
]);

export function* updateDatePickerInputHandler(action: any){
    try {
        const view: IView = yield select((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === action.payload?.viewId));
        const dateRangeInput: IInput | undefined = view?.meta?.inputs?.find((x: IInput) => x?.type === InputType.DateRange);
        const date: moment.Moment | undefined = datePickerMap?.get(action?.payload?.value);
        const value = [date?.format("YYYY-MM-DD"), moment()?.format("YYYY-MM-DD")];
        console.log(dateRangeInput, value)
        yield put({type: UpdateDashboardInput, payload: {...action.payload}});
        yield put({type: UpdateDashboardInput, payload: {...action.payload, inputId: dateRangeInput?.id, value}})
    } catch(e) {
        console.error(e);
    }
}

export function* updateDatePickerInputListener(){
    yield takeEvery(UpdateDatePickerInput, updateDatePickerInputHandler);
}

export function* updateDateRangeInputHandler(action: any){
    try {
        const view: IView = yield select((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === action.payload?.viewId));
        const datePickerInput: IInput | undefined = view?.meta?.inputs?.find((x: IInput) => x?.type === InputType.DatePicker);
        yield put({type: UpdateDashboardInput, payload: {...action.payload}});
        if (datePickerInput) {
            yield put({type: UpdateDashboardInput, payload: {...action.payload, inputId: datePickerInput?.id, value: null}})
        }
    } catch(e) {
        console.error(e);
    }
}

export function* updateDateRangeInputListener(){
    yield takeEvery(UpdateDateRangeInput, updateDateRangeInputHandler);
}