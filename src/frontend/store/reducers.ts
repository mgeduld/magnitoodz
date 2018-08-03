import { combineReducers } from 'redux'
import { magnitood, magnitoodz } from '../modules/magnitoodz'
import { authenticationReducer as authentication } from '../modules/authentication'

export const reducers = combineReducers({
    authentication,
    magnitood,
    magnitoodz
})