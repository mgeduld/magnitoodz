import { connection } from '../connection'
import { factory as getAllFactory } from './get-all'
import { factory as getOneByIdFactory } from './get-one-by-id'
import { factory as createOneFactory } from './create-one'
import { factory as getCountFactory } from './get-count'
import { factory as updateOneFactory } from './update-one'

export const getAll = getAllFactory(connection)
export const getOneById = getOneByIdFactory(connection)
export const createOne = createOneFactory(connection)
export const getCount = getCountFactory(connection)
export const updateOne = updateOneFactory(connection)
