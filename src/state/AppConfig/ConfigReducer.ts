import IConfigManager from "../../types/IConfigManager";
import State from "../State";
import { InitConfigComplete } from "./ConfigActions";

export default function configReducer(state = State.configManager, action: { type: string, payload?: any }): IConfigManager {
    switch (action.type) {
      case InitConfigComplete: {
        return {
          ...state,
          config: action.payload
        };
      }
      default:
        return state
    }
  }