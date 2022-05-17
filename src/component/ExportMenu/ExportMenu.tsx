import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";

const ExportMenu = () => {
    const items = [{
        id: "export",
        name: "Export"
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

export default ExportMenu;