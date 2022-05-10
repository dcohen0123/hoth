import { IDashboard } from "./IDashboard";

export enum ViewType {
    Dashboard="dashboard"
}

export type ViewMain = IDashboard;

export interface IView {
    id: string;
    title: string;
    type: ViewType;
    main: ViewMain;
}