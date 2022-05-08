export enum InputType {
    Select="select",
    Search="search"
}

export type InputContent = /* ISelect | ISearch */ "";

export interface IInput {
    id: string;
    title: string;
    type: InputType;
    content: InputContent;
}