import { IDashboard } from "./IDashboard";
import { IInstitution } from "./IInstitution";

export interface IDataManager {
    institutions: IInstitution[];
    dashboards: IDashboard[];
    learn: any[];
}