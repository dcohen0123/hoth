import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";

const MoreMenu = () => {
    const items = [{
        id: "item1",
        name: "Item 1"
    }, {
        id: "item2",
        name: "Item 2"
    }, {
        id: "item3",
        name: "Item 3"
    }, {
        id: "item4",
        name: "Item 4"
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

export default MoreMenu;