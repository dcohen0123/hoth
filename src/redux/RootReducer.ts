import { combineReducers } from 'redux';
import dataReducer from './Data/DataReducer';
import eventReducer from './Event/EventReducer';
import navbarReducer from './Navbar/NavbarReducer';
import settingsReducer from './Settings/SettingsReducer';
import userReducer from './User/UserReducer';
import workspaceReducer from './Workspace/WorkspaceReducer';

export default combineReducers({
    workspaceManager: workspaceReducer,
    navbarManager: navbarReducer,
    userManager: userReducer,
    settingsManager: settingsReducer,
    eventManager: eventReducer,
    dataManager: dataReducer
})