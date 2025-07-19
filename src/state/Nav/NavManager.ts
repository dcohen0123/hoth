import { Align, NavItemType } from "../../types/INavItem";
import { INavManager } from "../../types/INavManager";

const navManager: INavManager = {
    items: [{
        id: "workflows",
        type: NavItemType.Workflow,
        name: "Workflows",
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