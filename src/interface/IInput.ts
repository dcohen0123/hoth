export enum InputType {
    Select="select",
    Search="search",
    Legend="legend",
    Close="close"
}

export interface IInput {
    id: string;
    title: string;
    type: InputType;
    value: any;
    meta: any;
}