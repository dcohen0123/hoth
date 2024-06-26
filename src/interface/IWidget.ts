import { IDrill } from "./IDrill";
import { IEvent } from "./IEvent";
import { IInput } from "./IInput";
import { IMain } from "./IMain";
import { IPos } from "./IPos";
import { ISize } from "./ISize";

export interface IWidget {
    id: string;
    fn: string;
    name: string;
    drill: IDrill[];
    inputs: IInput[];
    events: IEvent[];
    main: IMain;
    isDrill: boolean;
    data: any;
    size: ISize;
    pos: IPos;
    loading: boolean;
    hide: boolean;
}