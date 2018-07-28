import { Router } from 'express'
import { factory as getAllApiFactory } from './get-all'
import { factory as getOneByIdFactory } from './get-one-by-id'
import {
    getAll as getAllQuery,
    getOneById as getOneByIdQuery
} from '../../db/comparison'

export const api: Router = Router()

getAllApiFactory(api, getAllQuery)()
getOneByIdFactory(api, getOneByIdQuery)()