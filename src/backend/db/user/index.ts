import { connection } from '../connection'
import { factory as getOneByIdFactory } from './get-one-by-id'

export const getOneById = getOneByIdFactory(connection)