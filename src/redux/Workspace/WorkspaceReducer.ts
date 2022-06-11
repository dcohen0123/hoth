import { IInput } from "../../interface/IInput";
import { IView } from "../../interface/IView";
import { IWidget } from "../../interface/IWidget";
import { AddNewPatientComplete, AddOperationComplete } from "../AddPatient/AddPatientActions";
import { EditOperationComplete, EditPatientComplete, GetOperationComplete, GetPatientsComplete } from "../EditPatient/EditPatientActions";
import State from "../State";
import { AddView, UpdateDashboardInput, UpdateWidgetDimensions, UpdateWidgetInput } from "./WorkspaceActions";

export default function workspaceReducer(state = State.workspaceManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      case AddView: {
        const selected: any = {...state.selected};
        selected.views = [
          ...selected.views,
          action.payload
        ];
        return {
          ...state, 
          selected
        }
      }
      case UpdateWidgetDimensions: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.widgets = [...selected.views[viewIdx].meta.widgets];
        const widgetIdx: number = selected.views[viewIdx].meta.widgets.findIndex((x: IWidget) => x.id === action.payload.widgetId);
        selected.views[viewIdx].meta.widgets[widgetIdx] = {...selected.views[viewIdx].meta.widgets[widgetIdx]};
        selected.views[viewIdx].meta.widgets[widgetIdx].size = {...selected.views[viewIdx].meta.widgets[widgetIdx].size};
        selected.views[viewIdx].meta.widgets[widgetIdx].size.width = action.payload.width;
        selected.views[viewIdx].meta.widgets[widgetIdx].size.height = action.payload.height;
        return {
          ...state,
          selected
        }
      }
      case UpdateDashboardInput: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.inptues = [...selected.views[viewIdx].meta.inputs];
        const inputIdx: number =  selected.views[viewIdx].meta.inputs.findIndex((x: IInput) => x.id === action.payload.inputId);
        selected.views[viewIdx].meta.inputs[inputIdx] = {...selected.views[viewIdx].meta.inputs[inputIdx]};
        selected.views[viewIdx].meta.inputs[inputIdx].value = action.payload.value;
        return {
          ...state,
          selected
        }
      }
      case UpdateWidgetInput: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.widgets = [...selected.views[viewIdx].meta.widgets];
        const widgetIdx: number = selected.views[viewIdx].meta.widgets.findIndex((x: IWidget) => x.id === action.payload.widgetId);
        selected.views[viewIdx].meta.widgets[widgetIdx] = {...selected.views[viewIdx].meta.widgets[widgetIdx]};
        selected.views[viewIdx].meta.widgets[widgetIdx].inputs = [...selected.views[viewIdx].meta.widgets[widgetIdx].inputs];
        const inputIdx: number =  selected.views[viewIdx].meta.widgets[widgetIdx].inputs.findIndex((x: IInput) => x.id === action.payload.inputId);
        selected.views[viewIdx].meta.widgets[widgetIdx].inputs[inputIdx] = {...selected.views[viewIdx].meta.widgets[widgetIdx].inputs[inputIdx]};
        selected.views[viewIdx].meta.widgets[widgetIdx].inputs[inputIdx].value = action.payload.value;
        return {
          ...state,
          selected
        }
      }
      case AddNewPatientComplete: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.patient_id = action.payload?.data?.patient_id;
        return {
          ...state,
          selected
        }
      }
      case AddOperationComplete: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.data = action.payload.data;
        return {
          ...state,
          selected
        }
      }
      case GetPatientsComplete: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.patients = action.payload?.data?.patients;
        return {
          ...state,
          selected
        }
      }
      case GetOperationComplete: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.operation = action.payload?.data?.operation;
        return {
          ...state,
          selected
        }
      }
      case EditPatientComplete: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.data = action.payload?.data;
        return {
          ...state,
          selected
        }
      }
      case EditOperationComplete: {
        const selected: any = {...state.selected};
        selected.views = [...selected.views];
        const viewIdx: number = selected.views.findIndex((x: IView) => x.id === action.payload.viewId)
        selected.views[viewIdx] = {...selected.views[viewIdx]};
        selected.views[viewIdx].meta = {...selected.views[viewIdx].meta}
        selected.views[viewIdx].meta.data = action.payload.data;
        return {
          ...state,
          selected
        }
      }
      default:
        return state
    }
  }