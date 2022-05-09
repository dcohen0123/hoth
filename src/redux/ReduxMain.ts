import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import reducer from './Reducer/Reducer';
import State from './State/State';
import rootSaga from './Saga/Saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, State, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store