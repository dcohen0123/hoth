import { IWorkspaceManager } from "../../interface/IWorkspaceManager"

const workspaceManager: IWorkspaceManager = {
    selected: {
        id: "workspace",
        name: "Workspace",
        layout: null,
        views: []
    },
    workspaces: []
}

export default workspaceManager