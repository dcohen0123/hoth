import IConfigManager from "./IConfigManager";
import { IEventManager } from "./IEventManager";
import { INavManager } from "./INavManager";
import { IPopupManager } from "./IPopupManager";
import { ISettingsManager } from "./ISettingsManager";
import { IUserManager } from "./IUserManager";
import { IWorkspaceManager } from "./IWorkspaceManager";

export interface IState {
    configManager: IConfigManager,
    navManager: INavManager,
    workspaceManager: IWorkspaceManager,
    userManager: IUserManager,
    settingsManager: ISettingsManager,
    eventManager: IEventManager,
    popupManager: IPopupManager
}