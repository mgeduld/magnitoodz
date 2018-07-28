import { connection } from '../connection'
import { factory as getAllFactory } from './get-all'
import { factory as getOneByIdFactory } from './get-one-by-id'

export const getAll = getAllFactory(connection)
export const getOneById = getOneByIdFactory(connection)