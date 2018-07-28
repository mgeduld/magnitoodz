import { Router } from 'express'
import { factory as getAllApiFactory } from './get-all'
import { getAll as query } from '../../db/comparison'

export const api: Router = Router()

getAllApiFactory(api, query)()