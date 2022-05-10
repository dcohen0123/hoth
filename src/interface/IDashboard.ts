import { IInput } from "./IInput";
import { IWidget } from "./IWidget";

export interface IDashboard {
    inputs: IInput[];
    widgets: IWidget[];
}