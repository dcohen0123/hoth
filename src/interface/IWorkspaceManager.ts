import { IWorkspace } from "./IWorkspace";

export interface IWorkspaceManager {
    selected: IWorkspace;
    workspaces: IWorkspace[];
}