import { useSelector } from "react-redux";
import styled from "styled-components";
//@ts-ignore
import { EntypoBarGraph } from "react-entypo";
import { Maximize, OpenInNewOutlined } from "@mui/icons-material"
import { Input, Select } from "antd";
import { IInput, InputType } from "../interface/IInput";
import { IState } from "../interface/IState";
import { IWidget } from "../interface/IWidget";

const StyledInputs = styled.div``;

export interface IWidgetHeadProps {
    viewId: string;
    widgetId: string;
}

const { Option } = Select;

export const StyledMuiIcon = styled.div`
    svg {
        width: 19px !important;
        height: 19px !important;
    }
`;

export const StyledEntypoIcon = styled.div`
    svg {
        width: 14px !important;
        height: 14px !important;
    }
`;

export const StyledInput = styled.div`
    display: inline-block;
    margin-right: 1px;
    vertical-align: top;
`

export interface IWidgetInputsProps {
    viewId: string;
    widgetId: string;
}

const StyledWidgetSelect = styled(Select)`
    margin: 0;
    padding: 0;
    position: relative;
    width: 100px;
    top: 2px;
    right: 2px;
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

const StyledInputText = styled(Input)`
    vertical-align: top;
    position: relative;
    top: 1px;
    margin-right: 3px;
    height: 19px;
    width: 100px;
    font-size: 12px;
    padding:0;
    padding-right: 3px;
    padding-left: 5px;
    border: 1px solid #c2c2c2 !important;
`

const WidgetInputs = ({viewId, widgetId}: IWidgetInputsProps) => {
    const widget: IWidget = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x?.id === viewId)?.meta?.widgets?.find((x: IWidget) => x?.id === widgetId));
    const getInput = (x: IInput) => {
        let result: JSX.Element | null = null;
        switch(x.type) {
            case InputType.Legend: {
                result = getLegend(x);
                break;
            }
            case InputType.Maximize: {
                result = getMaximize(x);
                break;
            }
            case InputType.Popout: {
                result = getPopout(x);
                break;
            }
            case InputType.Select: {
                result = getSelect(x);
                break;
            }
            case InputType.Search: {
                result = getSearch(x);
                break;
            }
            default: {
                result = null;
            }
        }
        return <StyledInput key={x?.id}>{result}</StyledInput>;
    }
    const getPopout = (x: IInput) => {
        return <StyledMuiIcon><OpenInNewOutlined /></StyledMuiIcon>
    }
    const getSelect = (x: IInput) => {
        return <StyledWidgetSelect
            placeholder={<span>{x?.meta?.placeholder}</span>}
            size={"small"}
            optionFilterProp="children"
            value={x?.value ?? x?.meta?.default}
            filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        > {x?.meta?.data?.map((y: any) => (<Option key={y.value} value={y.value}>{y.key}</Option>))}
        </StyledWidgetSelect>
    }
    const getSearch = (x: IInput) => {
        return <StyledInputText allowClear placeholder={x?.meta?.placeholder} />
    }
    const getLegend = (x: IInput) => {
        return <StyledEntypoIcon><EntypoBarGraph /></StyledEntypoIcon>
    }
    const getMaximize = (x: IInput) => {
        return <StyledMuiIcon><Maximize /></StyledMuiIcon>;
    }
    return <StyledInputs>{widget?.inputs?.map(x => getInput(x))}</StyledInputs>
}

export default WidgetInputs;