import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducers } from './reducers'
import { sagas } from './saga'

const sagaMiddleware = createSagaMiddleware()

const storeWithMiddleware = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

export const store = storeWithMiddleware 