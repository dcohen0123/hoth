import { useDispatch } from "react-redux";
import { INavListItem } from "../../interface/INavListItem";
import { ViewType } from "../../interface/IView";
import { AddView } from "../../redux/Workspace/WorkspaceActions";
import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";
import { v4 as uuidv4 } from 'uuid';

export enum CreateTab {
    AddPatient="ADD_PATIENT",
    EditPatient="EDIT_PATIENT"
}

const viewMap = new Map([
    [CreateTab.AddPatient, ViewType.NewPatient],
    [CreateTab.EditPatient, ViewType.EditPatient]
])
const CreateMenu = () => {
    const dispatch = useDispatch(); 
    const items = [{id: CreateTab.AddPatient, name: "New Patient"}, {id: CreateTab.EditPatient, name: "Edit Patient"}]
    const handleSelect = (item: INavListItem) => {
        dispatch({type: AddView, payload: {id: uuidv4(), name: item?.name, type: viewMap.get(item.id as CreateTab)}});
    }
    return <>
        <NavHead />
        <NavList 
            items={items} 
            onSelect={handleSelect} 
        />
    </>
}

export default CreateMenu;