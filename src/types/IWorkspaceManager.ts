import { IWorkspace } from "./IWorkspace";

export interface IWorkspaceManager {
    selected: IWorkspace | null;
    workspaces: IWorkspace[];
}