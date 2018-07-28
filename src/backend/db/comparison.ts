import { connection } from './connection'

export const getAll = () => {
    return connection('comparison')
}