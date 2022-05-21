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
import { Select, DatePicker, Input } from "antd";
//@ts-ignore
import { EntypoBarGraph } from 'react-entypo';
import styled from "styled-components";
import { MaximizeOutlined, MinimizeOutlined, OpenInNewOutlined } from "@mui/icons-material";
export interface IDashboardProps {
    viewId: string;   
}

const { Option } = Select;

const { RangePicker } = DatePicker;

const options = {
    plotOptions: {
        series: {
            animation: false
        }
    },
    title: {
        text: ""
    },
    legend: {
        enabled: false
    },
    chart: {
        animation: false
    },
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
        name: "# Subjects Cumulative",
        type: 'column',
        data: [10, 20, 30, 50, 80, 100, 120, 140, 160, 200, 210, 220, 230, 240, 250, 260, 280, 310, 350, 400]
    }]
}

const ProgressBar = (props: any) => {
    return <div style={{marginTop: "5px", width: "100%", height: "15px", "border": "1px solid #ccc", borderRadius: "30px", background: props.node.rowIndex !== 2 ? "linear-gradient(to right, #51c734ff 80%, white 80% 100%)" : "linear-gradient(to right, rgb(222, 109, 99) 30%, white 30% 100%)"}}></div>
}

const StyledSelect = styled(Select)`
    margin: 0;
    width: 180px;
    border-radius: 5px !important;
    color: #000 !important;
    .ant-select-selector {
        border: 1px solid #c2c2c2 !important;
        font-size: 13px;
        height: 22px !important;
    }
    input::placeholder {
        color: #000 !important;
    }
`

const StyledWidgetSelect = styled(Select)`
    margin: 0;
    padding: 0;
    position: relative;
    width: 100px;
    top: -3px;
    margin-right: 4px;
    .ant-select-selector {
        border: 1px solid #c2c2c2 !important;
        padding: 0;
        font-size: 12px;
        height: 19px !important;
    }
    .ant-select-selection-item {
        padding: 0;
        position: relative;
        top: -3px;
    }
`;

const StyledInput = styled(Input)`
    vertical-align: top;
    position: relative;
    top: 1px;
    margin-right: 3px;
    height: 19px;
    width: 100px;
    font-size: 12px;
    padding:0;
    padding-left: 5px;
    border: 1px solid #c2c2c2 !important;
    ::placeholder {
        color: #000 !important;
    }
`

const StyledRangePicker = styled(RangePicker)`
    margin: 0;
    color: #000 !important;
    border: 1px solid #c2c2c2 !important;
    border-radius: 3px;
    height: 22px !important;
    input::placeholder {
        color: #000 !important;
        font-size: 13px;
        height: 22px !important;
    }
`

const StyledIcon = styled.div`
    vertical-align: top;
    display: inline-block;
    margin-right: 2px;  
    svg {
        width: 13px !important;
        height: 13px !important;
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
    const [max, setMax] = useState<any>(null);
    const [interval1, setInterval1] = useState<string>("week")
    const [interval2, setInterval2] = useState<string>("week")
    const [legend, setLegend] = useState<boolean>(false)
    useEffect(() => {
        const rect: any = divRef.current.getBoundingClientRect();
        setWidth(rect?.width);
        setHeight(rect?.height - 20);
    }, [])
    useEffect(() => {
        if (event?.type === EventType.WidgetResize) {
            if (!event?.meta?.viewId || event?.meta?.viewId === viewId) {
                setTimeout(() => {
                    const rect: any = divRef.current.getBoundingClientRect();
                    setWidth(rect.width);
                    setHeight(rect.height - 25);
                }, 0)
            }
        }
    }, [event])
    useEffect(() => {
        dispatch({type: AddEvent, payload: {type: EventType.WidgetResize, meta: {viewId}}})
    }, [max])
    const handleChart = (c: Chart) => {
        chart.current = c;
    }
    const handleResize = (split: number) => {
        dispatch({type: AddEvent, payload: {type: EventType.WidgetResize, meta: {viewId}}})
    }
    const handleMax = (comp: string) => {
        return () => {
            setMax(comp)
        }
    }
    const handleLegend = () => setLegend(!legend)
    const handleMin = () => setMax(null)
    return <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
        <div style={{width: "100%", background: "#fff",  padding: "2px 3px 2px 2px", borderBottom: "1px solid #ccc", borderTop: "1px solid #ccc", display: "flex", justifyContent: "space-between", flex: 0}}>
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
        <div style={{flex: 1, position: "relative"}}>
            <Split onResize={handleResize} direction={"horizontal"} initSplit={.66}>
                <Split onResize={handleResize} direction={"horizontal"}>
                    <Split onResize={handleResize} direction={"vertical"} initSplit={.9}>
                        <div style={{width: "100%", height: "100%", background: "#fff", position: max === "numSubjects" ? "absolute" : "static", zIndex: max === "numSubjects" ? 1 : 0, display: "flex", flexDirection: "column"}} ref={divRef}>
                            <div style={{display: "flex", justifyContent: "space-between", flex: 0, height: 22}}><h5 style={{marginLeft: "3px", marginBottom: 0}}><strong># Subjects Cumulative in Institution</strong></h5><div>
                            <StyledWidgetSelect
                                placeholder={<span style={{color: "#000"}}>Interval</span>}
                                size={"small"}
                                optionFilterProp="children"
                                value={interval1}
                                onChange={(value: any) => setInterval1(value)}
                                filterOption={(input: any, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="week">By Week</Option>
                                <Option value="month">By Month</Option>
                                <Option value="year">By Year</Option>
                                <Option value="day">By Day</Option>
                            </StyledWidgetSelect>
                                <StyledIcon onClick={handleLegend}><EntypoBarGraph /></ StyledIcon>{max  === "numSubjects" ? <MinimizeOutlined style={{width: 20, height: 20}} onClick={handleMin} /> : <MaximizeOutlined onClick={handleMax("numSubjects")} style={{width: 20, height: 20}}/>}<OpenInNewOutlined style={{width: 20, height: 20}} /></div></div>
                            <div style={{overflow: "hidden", width, height}}>
                                <HighchartsReact highcharts={Highcharts} options={{...options, legend: {enabled: legend}, chart: {...options.chart, width, height}}} callback={handleChart}/>
                            </div>
                        </div>
                        <div style={{width: "100%", height: "100%", background: "#fff", display: "flex", left: 0, top: 0, flexDirection: "column", position: max === "Stats" ? "absolute" : "static", zIndex: max === "Stats" ? 1 : 0}}>
                            <div style={{display: "flex", justifyContent: "space-between", flex: 0, height: 22}}><h5 style={{marginLeft: "3px", marginBottom: 0}}><strong>Stats</strong></h5><div>{max  === "Stats" ? <MinimizeOutlined style={{width: 20, height: 20}} onClick={handleMin} /> : <MaximizeOutlined onClick={handleMax("Stats")} style={{width: 20, height: 20}}/>}<OpenInNewOutlined style={{width: 20, height: 20}} /></div></div>
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
                        <div style={{width: "100%", height: "100%", background: "#fff", display: "flex", left: 0, top: 0, flexDirection: "column", position: max === "completeness" ? "absolute" : "static", zIndex: max === "completeness" ? 1 : 0}}>
                            <div style={{display: "flex", justifyContent: "space-between", flex: 0, height: 22}}><h5 style={{marginLeft: "3px", marginBottom: 0}}><strong>Completeness</strong></h5><div><StyledInput placeholder="Subject" />{max === "completeness" ? <MinimizeOutlined style={{width: 20, height: 20}} onClick={handleMin} /> : <MaximizeOutlined onClick={handleMax("completeness")} style={{width: 20, height: 20}}/>}<OpenInNewOutlined style={{width: 20, height: 20}} /></div></div>
                            <div style={{flex: 1}}>
                                <div className="ag-theme-balham" style={{height: "100%", width: "100%"}}>
                                    <AgGridReact 
                                        defaultColDef={{resizable: true, sortable: true, filter: "agTextColumnFilter"}}
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
                <div style={{width: "100%", height: "100%", background: "#fff", display: "flex", left: 0, top: 0, flexDirection: "column", position: max === "#Subjects" ? "absolute" : "static", zIndex: max === "#Subjects" ? 1 : 0}}>
                    <div style={{display: "flex", justifyContent: "space-between", flex: 0, height: 22}}><h5 style={{marginLeft: "3px", marginBottom: 0}}><strong># Subjects</strong></h5><div>
                        <StyledWidgetSelect
                                placeholder={<span style={{color: "#000"}}>Interval</span>}
                                size={"small"}
                                optionFilterProp="children"
                                value={interval2}
                                onChange={(value: any) => setInterval2(value)}
                                filterOption={(input: any, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="week">By Week</Option>
                                <Option value="month">By Month</Option>
                                <Option value="year">By Year</Option>
                                <Option value="day">By Day</Option>
                            </StyledWidgetSelect>
                        {max === "#Subjects" ? <MinimizeOutlined style={{width: 20, height: 20}} onClick={handleMin} /> : <MaximizeOutlined onClick={handleMax("#Subjects")} style={{width: 20, height: 20}}/>}<OpenInNewOutlined style={{width: 20, height: 20}} /></div></div>
                        <div style={{flex: 1}}>
                            <div className="ag-theme-balham" style={{height: "100%", width: "100%"}}>
                                <AgGridReact 
                                    defaultColDef={{resizable: true, sortable: true, filter: "agTextColumnFilter"}}
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
                    <div style={{width: "100%", height: "100%", background: "#fff", display: "flex", left: 0, top: 0, flexDirection: "column", position: max === "Contact" ? "absolute" : "static", zIndex: max === "Contact" ? 1 : 0}}>
                    <div style={{display: "flex", justifyContent: "space-between", flex: 0}}><h5 style={{marginLeft: "3px", marginBottom: 0}}><strong>Contact</strong></h5><div>{max === "Contact" ? <MinimizeOutlined style={{width: 20, height: 20}} onClick={handleMin} /> : <MaximizeOutlined onClick={handleMax("Contact")} style={{width: 20, height: 20}}/>}<OpenInNewOutlined style={{width: 20, height: 20}} /></div></div>
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