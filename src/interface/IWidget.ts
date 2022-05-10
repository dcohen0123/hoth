import { IChart } from "./IChart";
import { IDataGrid } from "./IDataGrid";
import { IInput } from "./IInput";

export enum WidgetType {
    Chart="chart",
    Grid="grid"
}

export type WidgetMain = IChart | IDataGrid

export interface IWidget {
    id: string;
    title: string;
    type: WidgetType;
    drill: any;
    data: any;
    inputs: IInput[];
    main: WidgetMain;
}