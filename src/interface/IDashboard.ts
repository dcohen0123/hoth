import { IInput, InputContent } from "./IInput";
import { IWidget, WidgetContent } from "./IWidget";

export interface IDashboard {
    inputs: IInput[];
    widgets: IWidget[];
}