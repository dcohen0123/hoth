import { ColDef } from "ag-grid-community";

export interface IDataGrid {
    cols: ColDef[];
    drillCols: string[];
}