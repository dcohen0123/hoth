export enum NavItemType {
    DashBoard="dashboard",
    Browse="browse",
    Export="export",
    Learn="learn",
    More="more",
    User="user",
    Settings="settings",
    Help="help"
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
    index: number;
}