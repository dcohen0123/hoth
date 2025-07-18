export enum NavItemType {
    User="user",
    Settings="settings",
    Help="help",
    Workflow="workflow"
}

export enum Align {
    Top="top",
    Bottom="bottom"
}

export interface INavItem {
    id: string;
    type: NavItemType;
    name: string;
    align: Align;
}