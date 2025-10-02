export enum ViewType {
    WorkflowManager="workflowManager"
}

export interface IView {
    id: string;
    name: string;
    type: ViewType;
    meta: any;
}