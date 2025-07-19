import State from "../State";
import { AddEvent } from "./EventAction";

export default function eventReducer(state = State.eventManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      case AddEvent: {
        return {
          ...state,
          event: action.payload
        }
      }
      default:
        return state
    }
  }