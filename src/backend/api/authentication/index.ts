import { Router } from 'express'
import { factory as signupFactory } from './signup'
import { factory as loginFactory } from './login'
import {
    getOneByEmail as getUserByEmailQuery,
    getOneByEmailOrName as getUserByEmailOrNameQuery,
    createOne as createUserQuery
} from '../../db/user'

export const api: Router = Router()

signupFactory(api, getUserByEmailOrNameQuery, createUserQuery)()
loginFactory(api, getUserByEmailQuery)()