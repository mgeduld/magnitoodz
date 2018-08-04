import { IComparison } from '../../../../shared/interfaces/comparison'
import { IAction } from '../../../interfaces/action'
import { ActionType } from '../../../enums/action-type'

export const magnitoodz = (
  state = { magnitoodz: [], count: 0 },
  action: IAction
) => {
  switch (action.type) {
    case ActionType.storeMagnitoodz:
      return { magnitoodz: action.data.data, count: action.data.count }
    default:
      return state
  }
}
