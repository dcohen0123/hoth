import { combineReducers } from 'redux';
import configReducer from './AppConfig/ConfigReducer';
import dataReducer from './Data/DataReducer';
import eventReducer from './Event/EventReducer';
import navReducer from './Nav/NavReducer';
import popupReducer from './Popup/PopupReducer';
import settingsReducer from './Settings/SettingsReducer';
import userReducer from './User/UserReducer';
import workspaceReducer from './Workspace/WorkspaceReducer';

export default combineReducers({
    configManager: configReducer,
    workspaceManager: workspaceReducer,
    navManager: navReducer,
    userManager: userReducer,
    settingsManager: settingsReducer,
    eventManager: eventReducer,
    dataManager: dataReducer,
    popupManager: popupReducer
})