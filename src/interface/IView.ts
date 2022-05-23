export enum ViewType {
    Dashboard="dashboard",
    Upload="upload"
}

export interface IView {
    id: string;
    name: string;
    type: ViewType;
    meta: any;
}