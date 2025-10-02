import State from "../State";
import { AddView, SelectWorkspace } from "./WorkspaceActions";

export default function workspaceReducer(state = State.workspaceManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      case SelectWorkspace: {
        return {
          ...state, 
          selected: action.payload
        }
      }
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