import { ComposedSignup } from './components/signup'
import { ComposedLogin } from './components/login'
import { saga as authenticationSaga } from './sagas'
import { reducer } from './reducers'

export const Login = ComposedLogin
export const Signup = ComposedSignup
export const saga = authenticationSaga
export const authenticationReducer = reducer
