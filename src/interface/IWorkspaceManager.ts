import { IWorkspace } from "./IWorkspace";

export interface IWorkspaceManager {
    selected: string;
    workspaces: IWorkspace[];
}