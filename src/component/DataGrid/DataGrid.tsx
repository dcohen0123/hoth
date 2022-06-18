import { ColDef, ColumnApi, GridApi, GridReadyEvent, RowNode, ValueFormatterParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IInput, InputType } from "../../interface/IInput";
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

export const columnTypes: {[key: string]: ColDef} = {
    "percent": {
        valueFormatter: (params) => (params?.value * 100)?.toFixed(2) + "%",
        filter: "agNumberColumnFilter",
        filterValueGetter: (params) => params?.getValue("completeness") * 100
    }
}

const DataGrid = ({viewId, widgetId}: IDataGridProps) => {
    const api = useRef<{api: GridApi, columnApi: ColumnApi}>()
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const search: IInput | undefined = widget?.inputs?.find(x => x?.type === InputType.Search)
    const searchValue: string = search?.value?.trim()?.toLowerCase() ?? ""
    useEffect(() => {
        api?.current?.api?.onFilterChanged()
    }, [searchValue])
    const handleGridReady = (e: GridReadyEvent) => {
        api.current = {api: e?.api, columnApi: e?.columnApi}
    }
    const getRowStyle = (params: any) => {
        if (params.node.isRowPinned()) {
            return {background: "#efefefff", fontWeight: "bold"}
        }
    }
    const isExternalFilterPresent = () => !!search
    const doesExternalFilterPass = (params: RowNode) => Object.values(params?.data)?.some(x => `${x}`?.trim()?.toLowerCase()?.includes(searchValue))
    return <StyledDataGrid className="ag-theme-balham">
        <AgGridReact 
            onGridReady={handleGridReady}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            columnTypes={columnTypes}
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

