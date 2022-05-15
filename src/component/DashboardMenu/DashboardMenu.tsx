import { useDispatch, useSelector } from "react-redux";
import { INavListItem } from "../../interface/INavListItem";
import { IState } from "../../interface/IState";
import { ViewType } from "../../interface/IView";
import { AddView } from "../../redux/Workspace/WorkspaceActions";
import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";
import { v4 as uuidv4 } from 'uuid';

const DashboardMenu = () => {
    const dashboards = useSelector((state: IState) => state.dataManager?.dashboards);
    const dispatch = useDispatch(); 
    const items = dashboards?.map(x => ({id: x?.id, name: x?.name}));
    const handleSelect = (item: INavListItem) => {
        const dashboard = dashboards?.find(x => x.id === item.id);
        dispatch({type: AddView, payload: {id: uuidv4(), name: dashboard?.name, type: ViewType.Dashboard, meta: dashboard}});
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