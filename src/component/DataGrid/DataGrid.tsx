import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import ProgressBar from "../ProgressBar/ProgressBar";

export interface IDataGridProps {
    viewId: string;
    widgetId: string;
}

const StyledDataGrid = styled.div`
    height: 100%;
    width: 100%;
    .ag-root-wrapper {
        border: none;
        border-top: 1px solid #ccc;
    }
`;

const DataGrid = ({viewId, widgetId}: IDataGridProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const getRowStyle = (params: any) => {
        if (params.node.isRowPinned()) {
            return {background: "#efefefff", fontWeight: "bold"}
        }
    }
    return <StyledDataGrid className="ag-theme-balham">
        <AgGridReact 
            components={{"ProgressBar": ProgressBar}}
            defaultColDef={{resizable: true, sortable: true, filter: true}}
            columnDefs={widget?.main?.meta?.colDefs}
            pinnedTopRowData={widget?.data?.total}
            getRowStyle={getRowStyle}
            rowData={widget?.data?.rows}
        />
    </StyledDataGrid>
}

export default DataGrid;

