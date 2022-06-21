import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
//@ts-ignore
import { DatePicker, Input, Radio, Select } from "antd";
import { IDashboard } from "../../interface/IDashboard";
import { IInput, InputType } from "../../interface/IInput";
import { IState } from "../../interface/IState";
import { IInstitution } from "../../interface/IInstitution";
import moment from "moment";
import { RunDashboard, UpdateDashboardInput, UpdateDatePickerInput, UpdateDateRangeInput } from "../../redux/Dashboard/DashboardActions";

const StyledInputs = styled.div`
    flex: 0;
    background: #fff;
    padding: 2px 1px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
`;

const { RangePicker } = DatePicker;

export interface IDashboardInputsProps {
    viewId: string;
}

const { Option } = Select;

export const StyledInput = styled.div`
    display: inline-block;
    margin-right: 1px;
    vertical-align: top;
    height: 0;
`

const StyledRangePicker = styled(RangePicker)`
    margin: 0;
    border: 1px solid #c2c2c2 !important;
    border-radius: 3px;
    height: 22px !important;
    input::placeholder {
        font-size: 13px;
        height: 22px !important;
        color: #6f6f6f;
    }
`

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

const StyledRadio = styled(Radio.Group)`
    height: 18px !important;
    .ant-radio-button-wrapper {
        height: 22px !important;
        font-size: 13px !important;
    }
    .ant-radio-button-wrapper > span {
        position: relative;
        bottom: 1px;
    }
`

const DashboardInputs = ({viewId}: IDashboardInputsProps) => {
    const dispatch = useDispatch();
    const institutions: IInstitution[] = useSelector((state: IState) => state?.dataManager?.institutions);
    const dashboard: IDashboard | undefined = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x.id === viewId)?.meta);
    const getInput = (x: IInput) => {
        let result: JSX.Element | null = null;

        switch(x.type) {
            case InputType.Select: {
                result = getSelect(x);
                break;
            }
            case InputType.Search: {
                result = getSearch(x);
                break;
            }
            case InputType.DateRange: {
                result = getDateRange(x);
                break;
            }
            case InputType.Institution: {
                result = getInstitution(x);
                break;
            }
            case InputType.DatePicker: {
                result = getDatePicker(x);
                break;
            }
            default: {
                result = null;
            }
        }
        return <StyledInput key={x?.id}>{result}</StyledInput>;
    }
    const getDateRange = (x: IInput) => {
        const handleChange = (dates: any) => {
            dispatch({type: UpdateDateRangeInput, payload: {viewId, inputId: x.id, value: dates?.map((d: any) => moment(d).format("YYYY-MM-DD"))}});
            dispatch({type: RunDashboard, payload: {viewId}});
        }
        return <StyledRangePicker size="small" value={x?.value?.map((d: any) => moment(d, "YYYY-MM-DD"))} onChange={handleChange} />
    }
    const getSelect = (x: IInput) => {
        const handleChange = (value: any) => {
            dispatch({type: UpdateDashboardInput, payload: {viewId, inputId: x.id, value}});
        }
        return <StyledSelect
            placeholder={<span style={{color: "#6f6f6f"}}>{x?.meta?.placeholder}</span>}
            size={"small"}
            onChange={handleChange}
            optionFilterProp="children"
            showSearch={true}
            value={x?.value ?? x?.meta?.default}
            filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {(x?.meta?.data)?.map((y: any) => (<Option key={y.value} value={y.value}>{y.key}</Option>))}
        </StyledSelect>
    }
    const getInstitution = (x: IInput) => {
        const handleChange = (value: any) => {
            dispatch({type: UpdateDashboardInput, payload: {viewId, inputId: x.id, value}});
            dispatch({type: RunDashboard, payload: {viewId}});
        }
        return <StyledSelect
            placeholder={<span style={{color: "#6f6f6f"}}>Institution</span>}
            size={"small"}
            onChange={handleChange}
            optionFilterProp="children"
            showSearch={true}
            value={x?.value}
            filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {institutions?.map((y: any) => (<Option key={y.name} value={y.id}>{y.name}</Option>))}
        </StyledSelect>
    }
    const getDatePicker = (x: IInput) => {
        const handleChange = (e: any) => {
            dispatch({type: UpdateDatePickerInput, payload: {viewId, inputId: x.id, value: e?.target?.value}});
            dispatch({type: RunDashboard, payload: {viewId}});
        }
        return <StyledRadio size={"small"} value={x?.value} onChange={handleChange}>
            {x?.meta?.options?.map((d: any) => <Radio.Button value={d?.value}>{d?.key}</Radio.Button>)}
        </StyledRadio>
    }
    const getSearch = (x: IInput) => {
        return <StyledInputText allowClear placeholder={x?.meta?.placeholder} />
    }
    return <StyledInputs>
        <div>
            {dashboard?.inputs?.filter(x => x?.align === "left")?.map(x => getInput(x))}
        </div>
        <div>
            {dashboard?.inputs?.filter(x => x?.align === "right")?.map(x => getInput(x))}
        </div>

    </StyledInputs>
}

export default DashboardInputs;