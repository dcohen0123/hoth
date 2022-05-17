import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";

const BrowseMenu = () => {
    const items = [{
        id: "browse",
        name: "Browse"
    }]
    const handleSelect = () => {};
    return <>
        <NavHead />
        <NavList 
            items={items} 
            onSelect={handleSelect} 
        />
    </>
}

export default BrowseMenu;