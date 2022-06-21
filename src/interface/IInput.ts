export enum InputType {
    Select="select",
    Search="search",
    Legend="legend",
    Maximize="maximize",
    Minimize="minimize",
    Popout="popout",
    Popin="popin",
    Close="close",
    DateRange="daterange",
    Institution="institution",
    DatePicker="datepicker"
}

export type Align = "left" | "right";

export interface IInput {
    id: string;
    name: string;
    type: InputType;
    value?: any;
    align?: Align;
    meta?: any;
}