import { call, put, select, takeEvery } from "redux-saga/effects";
import { IDashboard } from "../../interface/IDashboard";
import { IInput } from "../../interface/IInput";
import { IState } from "../../interface/IState";
import { IView, ViewType } from "../../interface/IView";
import { IWidget } from "../../interface/IWidget";
import { fetchPost } from "../../util/RestUtils";
import { RunDashboard, RunWidget, RunWidgetComplete, ToggleWidgetLoading } from "./DashboardActions";

export function* runDashboardHandler(action: any) {
    try {
        const view: IView = yield select((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === action.payload?.viewId));
        for (let i: number = 0; i < view?.meta?.widgets?.length; i++) {
            yield put({type: RunWidget, payload: {viewId: view?.id, widgetId: view?.meta?.widgets?.[i]?.id}})
        }
    } catch(e) {
        console.error(e);
    }
}

export function* runDashboardListener() {
    yield takeEvery(RunDashboard, runDashboardHandler)
}

export function* runWidgetHandler(action: any) {
    try {
        const view: IView = yield select((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === action.payload?.viewId));
        const widget: IWidget = view?.meta?.widgets?.find((x: IWidget) => x?.id === action.payload?.widgetId) as IWidget
        const request: any = {drill: widget?.drill};
        view?.meta?.inputs?.forEach((x: IInput) => request[x?.id] = x?.value);
        widget?.inputs?.forEach((x: IInput) => request[x?.id] = x?.value);
        yield put({type: ToggleWidgetLoading, viewId: view?.id, widgetId: widget?.id, loading: true});
        const response: Promise<any> = yield call(fetchPost, `http://localhost:5000/widgets/${widget?.fn}`, request)
        const data: Object = yield response
        yield put({type: RunWidgetComplete, viewId: view?.id, widgetId: widget?.id, data});
        yield put({type: ToggleWidgetLoading, viewId: view?.id, widgetId: widget?.id, loading: false});
    } catch(e) {
        console.error(e);
    }
}

export function* runWidgetListener() {
    yield takeEvery(RunWidget, runWidgetHandler);
}