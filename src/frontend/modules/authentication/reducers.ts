import { IAction } from '../../interfaces/action'
import { AuthenticationState } from '../../enums/authentication'
import { ActionType } from '../../enums/action-type'

const storeCreds = (id: number | undefined, name: string | undefined) => {
  id ? (localStorage.user_id = id) : localStorage.removeItem('user_id')
  name ? (localStorage.user_name = name) : localStorage.removeItem('user_name')
}

export const reducer = (
  state = { authenticationState: AuthenticationState.loggedOut },
  action: IAction
) => {
  switch (action.type) {
    case ActionType.changeAuthenticationState:
      storeCreds(action.id, action.name)
      return {
        ...state,
        authenticationState: action.state,
        id: action.id,
        userName: action.name
      }
    default:
      return state
  }
}
