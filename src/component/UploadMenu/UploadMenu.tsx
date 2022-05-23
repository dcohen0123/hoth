import { useDispatch, useSelector } from "react-redux";
import { INavListItem } from "../../interface/INavListItem";
import { IState } from "../../interface/IState";
import { ViewType } from "../../interface/IView";
import { AddView } from "../../redux/Workspace/WorkspaceActions";
import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";
import { v4 as uuidv4 } from 'uuid';

const UploadMenu = () => {
    const dispatch = useDispatch(); 
    const items = [{id: "upload", name: "Upload"}]
    const handleSelect = (item: INavListItem) => {
        dispatch({type: AddView, payload: {id: uuidv4(), name: "Upload", type: ViewType.Upload}});
    }
    return <>
        <NavHead />
        <NavList 
            items={items} 
            onSelect={handleSelect} 
        />
    </>
}

export default UploadMenu;