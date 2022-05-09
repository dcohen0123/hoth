import State from "../../../redux/State/State"

export default function navbarReducer(state = State.navbarManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      default:
        return state
    }
  }