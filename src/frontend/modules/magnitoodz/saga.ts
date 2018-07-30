import { all, call, put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../../enums/action-type';
import { IAction } from '../../interfaces/action';

const fetchMagnitoodz = () => fetch(`${process.env.SERVER_ORIGIN}/api/v1/`)
    .then(res => res.json())
    .catch(error => console.log('Error fetching Magnitoodz', error))

const fetchMagnitood = (id: number) => fetch(`${process.env.SERVER_ORIGIN}/api/v1/${id}`)
    .then(res => res.json())
    .catch(error => console.log('Error fetching Magnitood', error))

function* getAndPutMagnitoodz() {
    const response = yield call(fetchMagnitoodz)
    yield put({ type: ActionType.storeMagnitoodz, data: response.data })
}

function* requestMagnitood(action: IAction) {
    const response = yield call(fetchMagnitood, action.id)
    console.log(111, response)
}


export function* saga() {
    yield takeEvery(ActionType.fetchMagnitoodz, getAndPutMagnitoodz)
    yield takeEvery(ActionType.requestMagnitood, requestMagnitood)
}


