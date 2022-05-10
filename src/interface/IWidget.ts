import { IDrill } from "./IDrill";
import { IEvent } from "./IEvent";
import { IInput } from "./IInput";

export enum WidgetType {
    Chart="chart",
    Grid="grid"
}

export interface IWidget {
    id: string;
    title: string;
    type: WidgetType;
    drill: IDrill[];
    data: any;
    inputs: IInput[];
    events: IEvent[];
    meta: any;
}