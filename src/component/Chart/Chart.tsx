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
        type: "category",
        labels: {
            style: {
                color: "#000"
            }
        }
    }
}

export interface IChartProps {
    viewId: string;
    widgetId: string;
}

export const Chart = ({viewId, widgetId}: IChartProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const legend: IInput | undefined = widget?.inputs?.find(x => x?.type === InputType.Legend)
    return <HighchartsReact highcharts={Highcharts} options={{...options, legend: {enabled: legend?.value}, series: widget?.data?.series?.map((x: any) => ({name: x?.id, type: x?.type, data: x?.data?.map((d: any) => [d?.x, d?.y])})), chart: {...options.chart, width: widget?.size?.width, height: widget?.size?.height - 20}}}/>
}