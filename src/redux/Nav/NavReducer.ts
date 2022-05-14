import State from "../State";
import { NavItemSelected } from "./NavActions";

export default function navbarReducer(state = State.navManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      case NavItemSelected: {
        return {
          ...state, 
          selected: action.payload === state.selected ? null : action.payload
        }
      }
      default:
        return state
    }
  }