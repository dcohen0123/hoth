import { useDispatch, useSelector } from "react-redux";
import { INavListItem } from "../../interface/INavListItem";
import { IState } from "../../interface/IState";
import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";
import { v4 as uuidv4 } from 'uuid';
import { AddDashboard, RunDashboard } from "../../redux/Dashboard/DashboardActions";

const DashboardMenu = () => {
    const dashboards = useSelector((state: IState) => state.dataManager?.dashboards);
    const dispatch = useDispatch(); 
    const items = dashboards?.map(x => ({id: x?.id, name: x?.name}));
    const handleSelect = (item: INavListItem) => {
        const viewId: string = uuidv4();
        dispatch({type: AddDashboard, payload: {viewId, dashboardId: item?.id}});
        dispatch({type: RunDashboard, payload: {viewId}});
    }
    return <>
        <NavHead />
        <NavList 
            items={items} 
            onSelect={handleSelect} 
        />
    </>
}

export default DashboardMenu;