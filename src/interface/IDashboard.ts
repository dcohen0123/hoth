import { IInput } from "./IInput";
import { IWidget } from "./IWidget";

export interface IDashboard {
    id: string;
    name: string;
    inputs: IInput[];
    widgets: IWidget[];
}