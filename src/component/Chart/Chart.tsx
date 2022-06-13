import HighchartsReact from "highcharts-react-official"
import Highcharts, { Chart as c } from 'highcharts'
import { useSelector } from "react-redux";
import { IState } from "../../interface/IState";
import { IWidget } from "../../interface/IWidget";
import { IInput, InputType } from "../../interface/IInput";

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
        animation: false,
        zoomType: 'x'
    },
    yAxis: {
        title: "",
        labels: {
            style: {
                color: "#000"
            }
        }
    },
    xAxis: {
        title: "",
        labels: {
            style: {
                color: "#000"
            }
        },
        categories: ['1/1/22', '1/8/22', '1/15/22', '1/22/22', '1/29/22', '2/5/22', '2/15/22', 
        '2/29/22', '3/15/22', '4/20/22', '4/25/22', '5/5/22', '5/10/22', '5/15/22',
        '5/20/22', '5/25/22', '5/30/22', '6/5/22', '6/10/22', '6/15/22'
    ]}
}

export interface IChartProps {
    viewId: string;
    widgetId: string;
}

export const Chart = ({viewId, widgetId}: IChartProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const legend: IInput | undefined = widget?.inputs?.find(x => x?.type === InputType.Legend)
    return <HighchartsReact highcharts={Highcharts} options={{...options, legend: {enabled: legend?.value}, series: widget?.main?.meta?.series, chart: {...options.chart, width: widget?.size?.width, height: widget?.size?.height - 20}}}/>
}