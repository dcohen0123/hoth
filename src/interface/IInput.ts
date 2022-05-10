export enum InputType {
    Select="select",
    Search="search"
}

export type InputMain = /* ISelect | ISearch */ "";

export interface IInput {
    id: string;
    title: string;
    type: InputType;
    main: InputMain;
}