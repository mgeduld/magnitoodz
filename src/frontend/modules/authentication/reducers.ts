import { IAction } from '../../interfaces/action'
import { AuthenticationState } from '../../enums/authentication'
import { ActionType } from '../../enums/action-type'

export const reducer = (
  state = { authenticationState: AuthenticationState.loggedOut },
  action: IAction
) => {
  switch (action.type) {
    case ActionType.changeAuthenticationState:
      return { ...state, authenticationState: action.state, id: action.id }
    default:
      return state
  }
}
