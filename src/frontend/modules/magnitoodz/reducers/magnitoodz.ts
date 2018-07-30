import { IComparison } from '../../../../shared/interfaces/comparison'
import { IAction } from '../../../interfaces/action'
import { ActionType } from '../../../enums/action-type';

export const magnitoodz = (state: IComparison[] = [], action: IAction) => {
    switch (action.type) {
        case ActionType.storeMagnitoodz:
            return action.data
        default:
            return state
    }
}