import State from "../../../redux/State/State"

export default function workspaceReducer(state = State.workspaceManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      default:
        return state
    }
  }