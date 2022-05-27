import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { IDataGrid } from "../../interface/IDataGrid";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import ProgressBar from "../ProgressBar/ProgressBar";

export interface IDataGridProps {
    viewId: string;
    widgetId: string;
}

const DataGrid = ({viewId, widgetId}: IDataGridProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const getRowStyle = (params: any) => {
        if (params.node.isRowPinned()) {
            return {background: "#efefefff", fontWeight: "bold"}
        }
    }
    return <div className="ag-theme-balham" style={{height: "100%", width: "100%"}}>
        <AgGridReact 
            components={{"ProgressBar": ProgressBar}}
            defaultColDef={{resizable: true, sortable: true, filter: true}}
            columnDefs={widget?.main?.meta?.colDefs}
            pinnedTopRowData={[widget?.data[0]]}
            getRowStyle={getRowStyle}
            rowData={widget?.data?.slice(1)}
        />
    </div>
}

export default DataGrid;

