export enum InputType {
    Select="select",
    Search="search",
    Legend="legend",
    Maximize="maximize",
    Minimize="minimize",
    Popout="popout",
    Popin="popin",
    Close="close",
}

export enum Align {
    Left="left",
    Right="right"
}

export interface IInput {
    id: string;
    title: string;
    type: InputType;
    value: any;
    align: Align;
    index: number;
    meta?: any;
}