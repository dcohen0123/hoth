import { IView } from "./IView";

export interface IWorkspace {
    id: string;
    name: string;
    layout: any;
    views: IView[];
}