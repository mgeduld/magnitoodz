import { connection } from '../connection'
import { factory as getAllFactory } from './get-all'
import { factory as getOneByIdFactory } from './get-one-by-id'
import { factory as postOneFactory } from './post-one'

export const getAll = getAllFactory(connection)
export const getOneById = getOneByIdFactory(connection)
export const postOne = postOneFactory(connection)