import { IAction } from '../../../interfaces/action'
import { ActionType } from '../../../enums/action-type'
import { MagnitoodLoadedState } from '../../../enums/magnitood'

export const magnitood = (
  state = {
    magnitoodLoadedState: MagnitoodLoadedState.notLoaded,
    magnitood: {}
  },
  action: IAction
) => {
  switch (action.type) {
    case ActionType.updateMagnitood:
    case ActionType.requestMagnitood:
      return {
        ...state,
        magnitoodLoadedState: MagnitoodLoadedState.loading
      }
    case ActionType.storeMagnitood:
      return {
        ...state,
        magnitood: action.data,
        magnitoodLoadedState: MagnitoodLoadedState.loaded
      }
    default:
      return state
  }
}
