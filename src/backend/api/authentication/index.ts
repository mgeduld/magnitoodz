import { Router } from 'express'
import { factory as signupFactory } from './signup'
import { getOneByEmailOrName as getUserByEmailOrNameQuery } from '../../db/user'
import { createOne as createUserQuery } from '../../db/user'

export const api: Router = Router()

signupFactory(api, getUserByEmailOrNameQuery, createUserQuery)()