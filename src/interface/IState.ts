import { INavbarManager } from "./INavbarManager";
import { ISettingsManager } from "./ISettingsManager";
import { IUserManager } from "./IUserManager";
import { IWorkspaceManager } from "./IWorkspaceManager";

export interface IState {
    navbarManager: INavbarManager,
    workspaceManager: IWorkspaceManager,
    userManager: IUserManager,
    settingsManager: ISettingsManager
}