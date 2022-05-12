import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import reducer from './RootReducer';
import State from './State';
import rootSaga from './RootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, State, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store