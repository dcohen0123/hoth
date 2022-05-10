export enum INavbarItem {
    DashBoard="dashboard",
    Browse="browse",
    Export="export",
    Learn="learn",
    More="more"
}

export interface INavbar {
    selected: INavbarItem;
}