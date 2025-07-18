export enum ViewType {
    Dashboard="dashboard",
    NewPatient="newPatient",
    EditPatient="editPatient",
    WorkflowManager="workflowManager"
}

export interface IView {
    id: string;
    name: string;
    type: ViewType;
    meta: any;
}