export enum ViewType {
    Dashboard="dashboard"
}

export interface IView {
    id: string;
    title: string;
    type: ViewType;
    meta: any;
}