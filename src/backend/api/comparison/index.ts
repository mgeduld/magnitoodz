import { Router } from 'express'
import { factory as getAllApiFactory } from './get-all'
import { factory as getOneByIdFactory } from './get-one-by-id'
import { factory as postOneFactory } from './post-one'
import {
  getAll as getAllQuery,
  getOneById as getOneByIdQuery,
  createOne as createOneQuery,
  getCount as getCountQuery
} from '../../db/comparison'
import { getOneById as getOneUserByIdQuery } from '../../db/user'

export const api: Router = Router()

getAllApiFactory(api, getAllQuery, getCountQuery)()
getOneByIdFactory(api, getOneByIdQuery)()
postOneFactory(api, getOneUserByIdQuery, createOneQuery)()
