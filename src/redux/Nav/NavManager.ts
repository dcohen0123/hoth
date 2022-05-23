import { Align, NavItemType } from "../../interface/INavItem";
import { INavManager } from "../../interface/INavManager";

const navManager: INavManager = {
    items: [{
        id: "dashboard",
        type: NavItemType.DashBoard,
        name: "Dashboard",
        index: 0,
        align: Align.Top
    }, {
        id: "upload",
        type: NavItemType.Upload,
        name: "Upload",
        index: 1,
        align: Align.Top
    }, {
        id: "export",
        type: NavItemType.Export,
        name: "Export",
        index: 2,
        align: Align.Top
    }, {
        id: "browse",
        type: NavItemType.Browse,
        name: "Browse",
        index: 3,
        align: Align.Top
    }, {
        id: "learn",
        type: NavItemType.Learn,
        name: "Learn",
        index: 4,
        align: Align.Top
    }, {
        id: "more",
        type: NavItemType.More,
        name: "More",
        index: 5,
        align: Align.Top
    }, {
        id: "user",
        type: NavItemType.User,
        name: "User",
        index: 0,
        align: Align.Bottom
    }, {
        id: "help",
        type: NavItemType.Help,
        name: "Help",
        index: 1,
        align: Align.Bottom
    }, {
        id: "settings",
        type: NavItemType.Settings,
        name: "Settings",
        index: 2,
        align: Align.Bottom
    }],
    selected: null,
}

export default navManager;