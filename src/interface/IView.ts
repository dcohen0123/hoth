export enum ViewType {
    Dashboard="dashboard",
    NewPatient="newPatient",
    EditPatient="editPatient"
}

export interface IView {
    id: string;
    name: string;
    type: ViewType;
    meta: any;
}