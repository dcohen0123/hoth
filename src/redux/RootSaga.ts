import { all } from 'redux-saga/effects';
import { addNewPatientListener } from './AddPatient/AddPatientSaga';
import { fetchDataListener } from './Data/DataSaga';

export default function* rootSaga() {
    yield all([
        addNewPatientListener(),
        fetchDataListener()
    ]);
}