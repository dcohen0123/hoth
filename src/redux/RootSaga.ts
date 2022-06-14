import { all } from 'redux-saga/effects';
import { addNewPatientListener, addOperationListener } from './AddPatient/AddPatientSaga';
import { addDashboardListener, runDashboardListener, runWidgetListener } from './Dashboard/DashboardSaga';
import { fetchDataListener } from './Data/DataSaga';
import { editOperationListener, editPatientListener, getOperationListener, getPatientsListener } from './EditPatient/EditPatientSaga';

export default function* rootSaga() {
    yield all([
        addNewPatientListener(),
        addOperationListener(),
        fetchDataListener(),
        getPatientsListener(),
        getOperationListener(),
        editPatientListener(),
        editOperationListener(),
        runDashboardListener(),
        runWidgetListener(),
        addDashboardListener()
    ]);
}