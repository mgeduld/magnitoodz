import { ActionType } from "../../enums/action-type";

export const requestMagnitoodz = () => ({
    type: ActionType.requestMagnitoodz
})

export const requestMagnitood = (id) => ({
    type: ActionType.requestMagnitood,
    id
})