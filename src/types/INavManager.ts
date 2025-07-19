import { INavItem } from "./INavItem";

export interface INavManager {
    selected: INavItem | null;
    items: INavItem[];
}