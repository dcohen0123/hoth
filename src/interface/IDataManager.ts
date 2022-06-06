import { IDashboard } from "./IDashboard";

export interface IDataManager {
    institutions: {id: number, name: string}[];
    dashboards: IDashboard[];
    learn: any[];
}