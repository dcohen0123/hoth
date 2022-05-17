import { Modal } from "antd"
import { useDispatch } from "react-redux";
import { NavItemSelected } from "../../redux/Nav/NavActions";

const SettingsMenu = () => {
    const dispatch = useDispatch()
    const handleOk = () => dispatch({type: NavItemSelected, payload: null})
    const handleCancel = () => dispatch({type: NavItemSelected, payload: null})
    return <Modal title="Settings" visible={true} onOk={handleOk} onCancel={handleCancel}>
        <div>Settings Panel</div>
    </Modal>
}

export default SettingsMenu;