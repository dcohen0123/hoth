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
        categories: ['1/1/2022', '1/8/2022', '1/15/2022', '1/22/2022', '1/29/2022', '2/5/2022', '2/15/2022', 
        '2/29/2022', '3/15/2022', '4/20/2022', '4/25/2022', '5/5/2022', '5/10/2022', '5/15/2022',
        '5/20/2022', '5/25/2022', '5/30/2022', '6/5/2022', '6/10/2022', '6/15/2022'
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