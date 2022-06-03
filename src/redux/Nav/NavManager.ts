import { Align, NavItemType } from "../../interface/INavItem";
import { INavManager } from "../../interface/INavManager";

const navManager: INavManager = {
    items: [{
        id: "dashboard",
        type: NavItemType.DashBoard,
        name: "Dashboard",
        align: Align.Top
    }, {
        id: "create",
        type: NavItemType.Create,
        name: "Create",
        align: Align.Top
    }, {
        id: "export",
        type: NavItemType.Export,
        name: "Export",
        align: Align.Top
    }, {
        id: "browse",
        type: NavItemType.Browse,
        name: "Browse",
        align: Align.Top
    }, {
        id: "learn",
        type: NavItemType.Learn,
        name: "Learn",
        align: Align.Top
    }, {
        id: "more",
        type: NavItemType.More,
        name: "More",
        align: Align.Top
    }, {
        id: "user",
        type: NavItemType.User,
        name: "User",
        align: Align.Bottom
    }, {
        id: "help",
        type: NavItemType.Help,
        name: "Help",
        align: Align.Bottom
    }, {
        id: "settings",
        type: NavItemType.Settings,
        name: "Settings",
        align: Align.Bottom
    }],
    selected: null,
}

export default navManager;