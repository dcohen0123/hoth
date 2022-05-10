import State from "../State/State";

export default function eventReducer(state = State.eventManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      default:
        return state
    }
  }