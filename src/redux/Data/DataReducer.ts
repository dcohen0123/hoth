import State from "../State";
import { GetInstitutions } from "./DataActions";

export default function dataReducer(state = State.dataManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      case GetInstitutions: {
        return {
          ...state,
          institutions: action.payload
        };
      }
      default:
        return state
    }
  }