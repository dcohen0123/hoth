import State from "../State";
import { GetDashboards, GetInstitutions } from "./DataActions";

export default function dataReducer(state = State.dataManager, action: { type: string, payload?: any }) {
    switch (action.type) {
      case GetInstitutions: {
        return {
          ...state,
          institutions: action.payload
        };
      }
      case GetDashboards: {
        return {
          ...state,
          dashboards: action.payload
        };
      }
      default:
        return state
    }
  }