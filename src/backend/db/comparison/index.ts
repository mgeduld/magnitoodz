import { connection } from '../connection'
import { factory as getAllFactory } from './get-all'
import { factory as getOneByIdFactory } from './get-one-by-id'
import { factory as createOneFactory } from './create-one'

export const getAll = getAllFactory(connection)
export const getOneById = getOneByIdFactory(connection)
export const createOne = createOneFactory(connection)