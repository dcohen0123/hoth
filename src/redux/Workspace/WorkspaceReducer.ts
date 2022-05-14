import { IWorkspace } from "../../interface/IWorkspace";
import State from "../State";
import { AddView } from "./WorkspaceActions";

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
      default:
        return state
    }
  }