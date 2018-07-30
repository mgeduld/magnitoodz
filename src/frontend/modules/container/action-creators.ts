import { ActionType } from "../../enums/action-type";

export const fetchMagnitoodz = () => ({
    type: ActionType.fetchMagnitoodz
})

export const requestMagnitood = (id) => ({
    type: ActionType.requestMagnitood,
    id
})