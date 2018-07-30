import { IAction } from '../../../interfaces/action'
import { ActionType } from '../../../enums/action-type';
import { IComparison } from '../../../../shared/interfaces/comparison';

export const magnitood = (state: IComparison = {}, action: IAction) => {
    switch (action.type) {
        case ActionType.storeMagnitood:
            console.log(action.data)
            return action.data
        default:
            return state
    }
}