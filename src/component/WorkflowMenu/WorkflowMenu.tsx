import { useDispatch } from "react-redux";
import { INavListItem } from "../../types/INavListItem";
import { ViewType } from "../../types/IView";
import { AddView } from "../../state/Workspace/WorkspaceActions";
import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";
import { v4 as uuidv4 } from 'uuid';

const WorkflowMenu = () => {
    const dispatch = useDispatch();
    const items = [{id: "workflow-manager", name: "Workflow Manager"}];
    const handleSelect = (item: INavListItem) => {
        dispatch({type: AddView, payload: {id: uuidv4(), name: item.name, type: ViewType.WorkflowManager}});
    }
    return <>
        <NavHead />
        <NavList
            items={items}
            onSelect={handleSelect}
        />
    </>
}

export default WorkflowMenu;
