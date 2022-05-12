import { IInput } from "./IInput";
import { IWidget } from "./IWidget";

export interface IDashboard {
    title: string;
    inputs: IInput[];
    widgets: IWidget[];
}