import State from "../State";

export default function dataReducer(state = State.dataManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      default:
        return state
    }
  }