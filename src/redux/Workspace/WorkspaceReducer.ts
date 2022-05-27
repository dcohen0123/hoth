import { IView } from "../../interface/IView";
import { IWidget } from "../../interface/IWidget";
import State from "../State";
import { AddView, UpdateWidgetDimensions } from "./WorkspaceActions";

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
      default:
        return state
    }
  }