import { connection } from '../connection'
import { factory as getOneByIdFactory } from './get-one-by-id'
import { factory as getOneByEmailFactory } from './get-one-by-email'
import { factory as getOneByEmailOrNameFactory } from './get-one-by-email-or-name'
import { factory as createOneFactory } from './create-one'

export const getOneById = getOneByIdFactory(connection)
export const getOneByEmail = getOneByEmailFactory(connection)
export const getOneByEmailOrName = getOneByEmailOrNameFactory(connection)
export const createOne = createOneFactory(connection)
