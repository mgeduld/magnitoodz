import { ActionType } from '../../enums/action-type'
import { IComparison } from '../../../shared/interfaces/comparison'
import { IAction } from '../../interfaces/action'
import { ICredentials } from '../../../shared/interfaces/authentication'
import { AuthenticationState } from '../../enums/authentication'

export const requestMagnitoodz = (): IAction => ({
  type: ActionType.requestMagnitoodz
})

export const requestMagnitood = (id): IAction => ({
  id,
  type: ActionType.requestMagnitood
})

export const postMagnitood = (magnitood: IComparison): IAction => ({
  magnitood,
  type: ActionType.postMagnitood
})

export const requestSignup = (credentials: ICredentials) => ({
  credentials,
  type: ActionType.requestSignup
})

export const requestLogIn = (credentials: ICredentials) => ({
  credentials,
  type: ActionType.requestLogIn
})

export const requestLogOut = () => ({
  type: ActionType.requestLogOut
})

export const changeAuthenticationState = (state: AuthenticationState) => ({
  state,
  type: ActionType.changeAuthenticationState
})
