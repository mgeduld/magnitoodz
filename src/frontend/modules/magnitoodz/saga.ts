import { call, put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../../enums/action-type'
import { IAction } from '../../interfaces/action'
import { IComparison } from '../../../shared/interfaces/comparison'

const origin: string = process.env.SERVER_ORIGIN

const fetchMagnitoodzFromEndpoint = () => fetch(`${origin}/api/v1/`)
    .then(res => res.json())
    .catch(error => console.log('Error fetching Magnitoodz', error))

const fetchMagnitoodFromEndpoint = (id: number) => fetch(`${origin}/api/v1/magnitood/${id}`)
    .then(res => res.json())
    .catch(error => console.log('Error fetching Magnitood', error))

const postMagnitoodToEndpoint = (magnitood: IComparison) => fetch(`${origin}/api/v1/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(magnitood)

}).then(res => res.json())
    .catch(error => console.log('Error fetching Magnitood', error))

function* requestMagnitoodz() {
    const response = yield call(fetchMagnitoodzFromEndpoint)
    yield put({ type: ActionType.storeMagnitoodz, data: response.data })
}

function* requestMagnitood(action: IAction) {
    const response = yield call(fetchMagnitoodFromEndpoint, action.id)
    yield put({ type: ActionType.storeMagnitood, data: response.data })
}

function* postMagnitood(action: IAction) {
    yield call(postMagnitoodToEndpoint, action.magnitood)
    yield call(requestMagnitoodz)
}

export function* saga() {
    yield takeEvery(ActionType.requestMagnitoodz, requestMagnitoodz)
    yield takeEvery(ActionType.requestMagnitood, requestMagnitood)
    yield takeEvery(ActionType.postMagnitood, postMagnitood)
}


