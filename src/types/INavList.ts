import { INavListItem } from "./INavListItem";

export interface INavList {
    items: INavListItem[];
    onSelect: (item: INavListItem) => void;
}