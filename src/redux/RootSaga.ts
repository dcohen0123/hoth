import { all } from 'redux-saga/effects';
import { addNewPatientListener } from './AddPatient/AddPatientSaga';

export default function* rootSaga() {
    yield all([
        addNewPatientListener()
    ]);
}