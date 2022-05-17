import { IDrill } from "./IDrill";
import { IEvent } from "./IEvent";
import { IInput } from "./IInput";
import { IPos } from "./IPos";
import { ISize } from "./ISize";

export enum WidgetType {
    Chart="chart",
    Grid="grid"
}

export interface IWidget {
    id: string;
    name: string;
    type: WidgetType;
    drill: IDrill[];
    data: any;
    inputs: IInput[];
    events: IEvent[];
    size: ISize;
    pos: IPos;
    meta?: any;
}