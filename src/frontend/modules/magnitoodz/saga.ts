import { call, put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../../enums/action-type'
import { IAction } from '../../interfaces/action'
import { IComparison } from '../../../shared/interfaces/comparison'
import { itemsPerPage } from '../../constants/ui'

const origin: string = process.env.SERVER_ORIGIN

const fetchMagnitoodzFromEndpoint = (offset = 0, limit = itemsPerPage) =>
  fetch(`${origin}/api/v1/?offset=${offset}&limit=${limit}`, {
    credentials: 'include'
  })
    .then((res) => res.json())
    .catch((error) => console.log('Error fetching Magnitoodz', error))

const fetchMagnitoodFromEndpoint = (id: number) =>
  fetch(`${origin}/api/v1/magnitood/${id}`, { credentials: 'include' })
    .then((res) => res.json())
    .catch((error) => console.log('Error fetching Magnitood', error))

const getPostConfig = (
  magnitood: IComparison,
  isNew: boolean = true
): RequestInit => ({
  method: isNew ? 'POST' : 'PUT',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(magnitood)
})

const postMagnitoodToEndpoint = (magnitood: IComparison) =>
  fetch(`${origin}/api/v1/`, getPostConfig(magnitood))
    .then((res) => res.json())
    .catch((error) => console.log('Error posting Magnitood', error))

const updateMagnitoodAtEndpoint = (magnitood: IComparison) =>
  fetch(`${origin}/api/v1/`, getPostConfig(magnitood, false))
    .then((res) => res.json())
    .catch((error) => console.log('Error updating Magnitood', error))

const deleteMagnitoodViaEndpoint = (id: number, userId: number) =>
  fetch(`${origin}/api/v1/`, {
    method: 'Delete',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, user_id: localStorage.user_id })
  })
    .then((res) => res.json())
    .catch((error) => console.log('Error posting Magnitood', error))

function* requestMagnitoodz(action: IAction) {
  const response = yield call(
    fetchMagnitoodzFromEndpoint,
    action.offset,
    action.limit
  )
  yield put({ type: ActionType.storeMagnitoodz, data: response })
}

function* requestMagnitood(action: IAction) {
  const response = yield call(fetchMagnitoodFromEndpoint, action.id)
  yield put({ type: ActionType.storeMagnitood, data: response.data })
}

function* postMagnitood(action: IAction) {
  yield call(postMagnitoodToEndpoint, action.magnitood)
  yield call(requestMagnitoodz, action)
}

function* updateMagnitood(action: IAction) {
  yield call(updateMagnitoodAtEndpoint, action.magnitood)
  yield call(requestMagnitood, { ...action, id: action.magnitood.id })
  yield call(requestMagnitoodz, action)
}

function* requestDelete(action: IAction) {
  yield call(deleteMagnitoodViaEndpoint, action.id, action.userId)
  yield call(requestMagnitoodz, action)
}

export function* saga() {
  yield takeEvery(ActionType.requestMagnitoodz, requestMagnitoodz)
  yield takeEvery(ActionType.requestMagnitood, requestMagnitood)
  yield takeEvery(ActionType.postMagnitood, postMagnitood)
  yield takeEvery(ActionType.updateMagnitood, updateMagnitood)
  yield takeEvery(ActionType.requestDelete, requestDelete)
}
