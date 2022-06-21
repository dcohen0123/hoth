import { all } from 'redux-saga/effects';
import { addNewPatientListener, addOperationListener } from './AddPatient/AddPatientSaga';
import { initConfigListener } from './AppConfig/ConfigSaga';
import { addDashboardListener, runDashboardListener, runWidgetListener, updateDatePickerInputListener, updateDateRangeInputListener } from './Dashboard/DashboardSaga';
import { initDataListener } from './Data/DataSaga';
import { editOperationListener, editPatientListener, getOperationListener, getPatientsListener } from './EditPatient/EditPatientSaga';
import { initSettingsListener } from './Settings/SettingsSaga';
import { initUserListener } from './User/UserSaga';
import { initWorkspaceListener } from './Workspace/WorkspaceSaga';

export default function* rootSaga() {
    yield all([
        addNewPatientListener(),
        addOperationListener(),
        getPatientsListener(),
        getOperationListener(),
        editPatientListener(),
        editOperationListener(),
        runDashboardListener(),
        runWidgetListener(),
        addDashboardListener(),
        initWorkspaceListener(),
        initDataListener(),
        initUserListener(),
        initSettingsListener(),
        initConfigListener(),
        updateDatePickerInputListener(),
        updateDateRangeInputListener()
    ]);
}