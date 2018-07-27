import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { delay } from 'redux-saga'
import { all, put, takeEvery } from 'redux-saga/effects'


const reducer1 = (state = [1, 2, 3], action) => {
    if (action.type === 'addItem') {
        return [...state, action.value]
    }
    if (action.type === 'readyToAddFive') {
        return [...state, 5]
    }
    return state;
}

const reducer2 = (state = [3, 4, 5], action) => {
    if (action.type === 'addItem') {
        return [...state, action.value + 1]
    }
    if (action.type === 'readyToAddFive') {
        return [...state, 5]
    }
    return state;
}

const reducers = combineReducers({
    reducer1,
    reducer2
})

const sagaMiddleware = createSagaMiddleware()

function* addFiveSaga() {
    yield delay(1000)
    yield put({ type: 'readyToAddFive' })
}

function* watchForAddFiveSaga() {
    yield takeEvery('addFive', addFiveSaga)
}

function* rootSaga() {
    yield all([
        watchForAddFiveSaga()
    ])
}


const storeWithMiddleware = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export const store = storeWithMiddleware 