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
export interface IDashboardProps {
    viewId: string;   
}

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
        categories: ['1/1/2022', '1/8/2022', '1/15/2022', '1/22/2022', '1/29/2022'],
      },
    series: [{
        type: 'column',
        data: [1 ,2, 3, 4, 5]
    }]
}

const Dashboard = ({viewId}: IDashboardProps) => {
    const dispatch = useDispatch();
    const event = useSelector((state: IState) => state.eventManager.event);
    const chart = useRef<Chart>();
    const divRef = useRef<any>();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
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
                setHeight(rect.height - 20);
            }
        }
    }, [event])
    const handleChart = (c: Chart) => {
        chart.current = c;
    }
    const handleResize = (split: number) => {
        dispatch({type: AddEvent, payload: {type: EventType.WidgetResize, meta: {viewId}}})
    }
    return <Split onResize={handleResize} direction={"horizontal"} initSplit={.66}>
        <Split onResize={handleResize} direction={"horizontal"}>
            <Split onResize={handleResize} direction={"vertical"} initSplit={.8}>
                <div style={{width: "100%", height: "100%", background: "#fff"}} ref={divRef}>
                    <h5 style={{marginLeft: "3px"}}><strong>Number of Subjects Cumulative in Institution</strong></h5>
                    <div>
                        <HighchartsReact highcharts={Highcharts} options={{...options, chart: {width, height}}} callback={handleChart}/>
                    </div>
                </div>
                <div style={{width: "100%", height: "100%", flexDirection: "column", background: "#fff", display: "flex"}}>
                    <h5 style={{marginLeft: "3px"}}><strong>Stats</strong></h5>
                    <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                        <div>
                            <h2><strong>This Week</strong></h2>
                            <h1><strong style={{fontSize: "40px"}}>8</strong></h1>
                        </div>
                        <div>
                            <h2><strong>Total</strong></h2>
                            <h1><strong style={{fontSize: "40px"}}>88</strong></h1>
                        </div>
                    </div>
                </div>
            </Split>
            <Split onResize={handleResize} direction={"horizontal"}>
                <div style={{width: "100%", height: "100%", background: "#fff"}}>Widget 3</div>
                {null as any}
            </Split>
        </Split>
        <Split onResize={handleResize} direction={"vertical"}>
            <div style={{width: "100%", height: "100%", background: "#fff"}}>Widget 4</div>
            <div style={{width: "100%", height: "100%", background: "#fff"}}>Widget 5</div>
        </Split>
    </Split>
}

export default Dashboard;