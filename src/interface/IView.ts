import { IDashboard } from "./IDashboard";

export enum ViewType {
    Dashboard="dashboard"
}

export type ViewContent = IDashboard;

export interface IView {
    id: string;
    title: string;
    type: ViewType;
    content: ViewContent;
}