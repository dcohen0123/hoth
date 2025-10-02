import { IState } from "../interface/IState";
import configManager from "./AppConfig/ConfigManager";
import eventManager from "./Event/EventManager";
import navManager from "./Nav/NavManager";
import popupManager from "./Popup/PopupManager";
import settingsManager from "./Settings/SettingsManager";
import userManager from "./User/UserManager";
import workspaceManager from "./Workspace/WorkspaceManager";

const state: IState = {
    configManager,
    navManager,
    workspaceManager,
    userManager,
    settingsManager,
    eventManager,
    popupManager
}

export default state;