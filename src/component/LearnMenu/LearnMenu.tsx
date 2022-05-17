import NavHead from "../NavHead/NavHead";
import NavList from "../NavList/NavList";

const LearnMenu = () => {
    const items = [{
        id: "video1",
        name: "Video 1"
    }, {
        id: "video2",
        name: "Video 2"
    }, {
        id: "video3",
        name: "Video 3"
    }, {
        id: "video4",
        name: "Video 4"
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

export default LearnMenu;