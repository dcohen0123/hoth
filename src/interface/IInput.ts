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

export interface IInput {
    id: string;
    title: string;
    type: InputType;
    value: any;
    meta?: any;
}