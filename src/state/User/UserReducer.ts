import State from "../State"

export default function userReducer(state = State.userManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      default:
        return state
    }
  }