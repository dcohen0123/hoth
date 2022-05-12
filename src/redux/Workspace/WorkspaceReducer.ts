import State from "../State";

export default function workspaceReducer(state = State.workspaceManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      default:
        return state
    }
  }