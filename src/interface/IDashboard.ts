import { IInput } from "./IInput";
import { IWidget } from "./IWidget";

export interface IDashboard {
    id: string;
    title: string;
    inputs: IInput[];
    widgets: IWidget[];
}