import { connection } from '../connection'
import { factory as getAllFactory } from './get-all'

export const getAll = getAllFactory(connection) 