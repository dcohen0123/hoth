export enum ViewType {
    Dashboard="dashboard"
}

export interface IView {
    id: string;
    name: string;
    type: ViewType;
    meta: any;
}