import { ActionType } from '../../enums/action-type'
import { magnitood } from '../magnitoodz'
import { IComparison } from '../../../shared/interfaces/comparison'
import { IAction } from '../../interfaces/action';

export const requestMagnitoodz = (): IAction => ({
    type: ActionType.requestMagnitoodz
})

export const requestMagnitood = (id): IAction => ({
    type: ActionType.requestMagnitood,
    id
})

export const postMagnitood = (magnitood: IComparison): IAction => ({
    type: ActionType.postMagnitood,
    magnitood
})