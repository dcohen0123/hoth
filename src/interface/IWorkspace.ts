import { IView } from "./IView";

export interface IWorkspace {
    id: string;
    title: string;
    layout: any;
    views: IView[];
}