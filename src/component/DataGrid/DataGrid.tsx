import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { IDataGrid } from "../../interface/IDataGrid";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";

export interface IDataGridProps {
    viewId: string;
    widgetId: string;
}

const DataGrid = ({viewId, widgetId}: IDataGridProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const datagrid: IDataGrid = widget?.main?.meta;
    return <AgGridReact columnDefs={datagrid?.cols} />;
}

export default DataGrid;