import { IComparison } from '../../../../shared/interfaces/comparison'
import { IAction } from '../../../interfaces/action'
import { ActionType } from '../../../enums/action-type'
import { MagnitoodzLoadedState } from '../../../enums/magnitoodz'

export const magnitoodz = (
  state = {
    magnitoodz: [],
    count: 0,
    magnitoodzLoadedState: MagnitoodzLoadedState.notLoaded
  },
  action: IAction
) => {
  switch (action.type) {
    case ActionType.requestMagnitoodz:
      return {
        ...state,
        magnitoodzLoadedState: MagnitoodzLoadedState.loading
      }
    case ActionType.storeMagnitoodz:
      return {
        magnitoodz: action.data.data,
        count: action.data.count,
        magnitoodzLoadedState: MagnitoodzLoadedState.loaded
      }
    default:
      return state
  }
}
