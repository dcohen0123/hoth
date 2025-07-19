import { all } from 'redux-saga/effects';
import { initConfigListener } from './AppConfig/ConfigSaga';
import { initSettingsListener } from './Settings/SettingsSaga';
import { initUserListener } from './User/UserSaga';
import { initWorkspaceListener } from './Workspace/WorkspaceSaga';

export default function* rootSaga() {
    yield all([
        initWorkspaceListener(),
        initUserListener(),
        initSettingsListener(),
        initConfigListener(),
    ]);
}