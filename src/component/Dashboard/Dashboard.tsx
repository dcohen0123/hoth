import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDashboard } from "../../interface/IDashboard";
import { IState } from "../../interface/IState";
import { IView } from "../../interface/IView";
import Split from "../Split/Split";
import Highcharts, { Chart } from 'highcharts'
import { EventType } from "../../interface/IEvent";
import { AddEvent } from "../../redux/Event/EventAction";
import { AgGridReact } from "ag-grid-react";
import { Select, DatePicker } from "antd";

import styled from "styled-components";
export interface IDashboardProps {
    viewId: string;   
}

const { Option } = Select;

const { RangePicker } = DatePicker;

const options = {
    title: {
        text: ""
    },
    legend: {
        enabled: false
    },
    chart: {},
    yAxis: {
        title: ""
    },
    xAxis: {
        categories: ['1/1/2022', '1/8/2022', '1/15/2022', '1/22/2022', '1/29/2022', '2/5/2022', '2/15/2022', 
        '2/29/2022', '3/15/2022', '4/20/2022', '4/25/2022', '5/5/2022', '5/10/2022', '5/15/2022',
        '5/20/2022', '5/25/2022', '5/30/2022', '6/5/2022', '6/10/2022', '6/15/2022'
    ],
      },
    series: [{
        type: 'column',
        data: [10, 20, 30, 50, 80, 100, 120, 140, 160, 200, 210, 220, 230, 240, 250, 260, 280, 310, 350, 400]
    }]
}

const ProgressBar = (props: any) => {
    return <div style={{marginTop: "5px", width: "100%", height: "15px", "border": "1px solid #ccc", borderRadius: "30px", background: props.node.rowIndex !== 2 ? "linear-gradient(to right, #51c734ff 80%, white 80% 100%)" : "linear-gradient(to right, rgb(222, 109, 99) 30%, white 30% 100%)"}}></div>
}

const StyledSelect = styled(Select)`
    margin: 0;
    width: 200px;
    border-radius: 5px !important;
    color: #000 !important;
    .ant-select-selector {
        border: 1px solid #c2c2c2 !important;
    }
    input::placeholder {
        color: #000 !important;
    }
`

const StyledRangePicker = styled(RangePicker)`
    margin: 0;
    color: #000 !important;
    border: 1px solid #c2c2c2 !important;
    border-radius: 3px;
    input::placeholder {
        color: #000 !important;
    }
`

const Dashboard = ({viewId}: IDashboardProps) => {
    const dispatch = useDispatch();
    const event = useSelector((state: IState) => state.eventManager.event);
    const chart = useRef<Chart>();
    const divRef = useRef<any>();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [value, setValue] = useState(null);
    useEffect(() => {
        const rect: any = divRef.current.getBoundingClientRect();
        setWidth(rect?.width);
        setHeight(rect?.height - 20);
    }, [])
    useEffect(() => {
        if (event?.type === EventType.WidgetResize) {
            if (!event?.meta?.viewId || event?.meta?.viewId === viewId) {
                const rect: any = divRef.current.getBoundingClientRect();
                setWidth(rect.width);
                setHeight(rect.height - 6);
            }
        }
    }, [event])
    const handleChart = (c: Chart) => {
        chart.current = c;
    }
    const handleResize = (split: number) => {
        dispatch({type: AddEvent, payload: {type: EventType.WidgetResize, meta: {viewId}}})
    }
    return <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
        <div style={{width: "100%", background: "#fff",  padding: "2px 3px 2px 2px", borderBottom: "1px solid #ccc", borderTop: "1px solid #ccc", display: "flex", justifyContent: "space-between"}}>
        <StyledSelect
            showSearch
            placeholder={<span style={{color: "#000"}}>Institution</span>}
            size={"small"}
            optionFilterProp="children"
            value={value}
            onChange={(value: any) => setValue(value)}
            filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            <Option value="stanford">Stanford Medical Center</Option>
            <Option value="nyu">NYU Langone</Option>
            <Option value="harvard">Harvard Medical School</Option>
        </StyledSelect>
        <StyledRangePicker size="small" />
        </div>
        <div style={{flex: 1}}>
            <Split onResize={handleResize} direction={"horizontal"} initSplit={.66}>
                <Split onResize={handleResize} direction={"horizontal"}>
                    <Split onResize={handleResize} direction={"vertical"} initSplit={.9}>
                        <div style={{width: "100%", height: "100%", background: "#fff"}} ref={divRef}>
                            <h5 style={{marginLeft: "3px", marginBottom: 0}}><strong># Subjects Cumulative in Institution</strong></h5>
                            <div>
                                <HighchartsReact highcharts={Highcharts} options={{...options, chart: {width, height}}} callback={handleChart}/>
                            </div>
                        </div>
                        <div style={{width: "100%", height: "100%", flexDirection: "column", background: "#fff", display: "flex"}}>
                            <h5 style={{marginLeft: "3px", marginBottom: 0}}><strong>Stats</strong></h5>
                            <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                                <div>
                                    <h3><strong>This Week</strong></h3>
                                    <h1><strong style={{fontSize: "40px"}}>8</strong></h1>
                                </div>
                                <div>
                                    <h3><strong>Total</strong></h3>
                                    <h1><strong style={{fontSize: "40px"}}>88</strong></h1>
                                </div>
                            </div>
                        </div>
                    </Split>
                    <Split onResize={handleResize} direction={"horizontal"}>
                        <div style={{width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column"}}>
                            <h5 style={{marginLeft: "3px", marginBottom: 0}}><strong>Completeness</strong></h5>
                            <div style={{flex: 1}}>
                                <div className="ag-theme-balham" style={{height: "100%", width: "100%"}}>
                                    <AgGridReact 
                                        defaultColDef={{resizable: true, sortable: true}}
                                        columnDefs={[{field: "Subject"}, {field: "Completeness", width: 400, cellRenderer: ProgressBar}, {field: "Percent"}, {field: "Go To Subject"}]} 
                                        pinnedTopRowData={[{"Subject": "Total", "Percent": "84%", "Go To Subject": "<Link To Subject>"}]}
                                        getRowStyle={(params) => {
                                            if (params.node.isRowPinned()) {
                                                return {background: "#efefefff", fontWeight: "bold"}
                                            }
                                        }}
                                        rowData={[{"Subject": 88, "Percent": "84%", "Go To Subject": "<Link To Subject>"},
                                        {"Subject": 87, "Percent": "84%", "Go To Subject": "<Link To Subject>"},
                                        {"Subject": 86, "Percent": "30%", "Go To Subject": "<Link To Subject>"},
                                        {"Subject": 85, "Percent": "81%", "Go To Subject": "<Link To Subject>"}]}
                                    />
                                </div>
                            </div>
                        </div>
                        {null as any}
                    </Split>
                </Split>
                <Split onResize={handleResize} direction={"vertical"}>
                    <div style={{width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column"}}>
                        <h5 style={{marginLeft: "3px", marginBottom: 0}}><strong># Subjects</strong></h5>
                        <div style={{flex: 1}}>
                            <div className="ag-theme-balham" style={{height: "100%", width: "100%"}}>
                                <AgGridReact 
                                    defaultColDef={{resizable: true, sortable: true}}
                                    columnDefs={[{field: "Date"}, {field: "# Subjects"}]} 
                                    pinnedTopRowData={[{"Date": "Total", "# Subjects": "210"}]}
                                    getRowStyle={(params) => {
                                        if (params.node.isRowPinned()) {
                                            return {background: "#efefefff", fontWeight: "bold"}
                                        }
                                    }}
                                    rowData={[{"Date": "1/8/2022", "# Subjects": 14},
                                    {"Date": "1/15/2022", "# Subjects": 15},
                                    {"Date": "1/23/2022", "# Subjects": 12},
                                    {"Date": "1/31/2022", "# Subjects": 16}]}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column"}}>
                        <h5 style={{marginLeft: "3px", marginBottom: 0}}><strong>Contact</strong></h5>
                        <div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <img style={{width: "525px", height: "280px"}} src="contact.png" />
                        </div>
                    </div>
                </Split>
            </Split>
        </div>
    </div>
}

export default Dashboard;