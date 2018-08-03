import { Router } from 'express'
import { factory as signupFactory } from './signup'
import { factory as loginFactory } from './login'
import { factory as logoutFactory } from './logout'
import {
  getOneByEmail as getUserByEmailQuery,
  getOneByEmailOrName as getUserByEmailOrNameQuery,
  createOne as createUserQuery
} from '../../db/user'

export const api: Router = Router()

signupFactory(api, getUserByEmailOrNameQuery, createUserQuery)()
loginFactory(api, getUserByEmailQuery)()
logoutFactory(api)()
