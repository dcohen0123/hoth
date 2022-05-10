import { combineReducers } from 'redux';
import navbarReducer from '../../component/Navbar/Redux/NavbarReducer';
import workspaceReducer from '../../component/Workspace/Redux/WorkspaceReducer';
import userReducer from '../../component/User/Redux/UserReducer';
import settingsReducer from '../../component/Settings/Redux/SettingsReducer';
import eventReducer from './EventReducer';

export default combineReducers({
    workspaceManager: workspaceReducer,
    navbarManager: navbarReducer,
    userManager: userReducer,
    settingsManager: settingsReducer,
    eventManager: eventReducer
})