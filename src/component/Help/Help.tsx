import { Modal } from "antd"
import { useDispatch } from "react-redux";
import { NavItemSelected } from "../../state/Nav/NavActions";

const HelpMenu = () => {
    const dispatch = useDispatch()
    const handleOk = () => dispatch({type: NavItemSelected, payload: null})
    const handleCancel = () => dispatch({type: NavItemSelected, payload: null})
    return <Modal title="Help" visible={true} onOk={handleOk} onCancel={handleCancel}>
        <div>Help Panel</div>
    </Modal>
}

export default HelpMenu;