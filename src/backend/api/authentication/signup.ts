import { IRestApi, IRequest, IResponse } from '../../interfaces/express'
import bcrypt = require('bcrypt')

import { Authentication } from '../../enums/authentication'
import { isValidObject } from '../../utils/validation'
import { IUser } from '../../interfaces/user'
import { setUserIdCookie } from '../../utils/response'

const requiredFields = ['name', 'email', 'password']
const optionalFields = ['meta']

const buildUser = (credentials: { [key: string]: any }, passwordHash: string) => {
    const user: IUser = {
        name: credentials.name,
        email: credentials.email,
        password: passwordHash,
        created_at: new Date().toUTCString(),
        updated_at: new Date().toUTCString()
    }
    if (credentials.meta) {
        user.meta = credentials.meta
    }
    return user;
}

const addNewUser = async ({ password, createUserQuery, req, res }) => {
    const passwordHash = await bcrypt.hash(password, Authentication.salt)
    const user = buildUser(req.body, passwordHash)
    const id = await createUserQuery(user)
    setUserIdCookie(req, res, id)
    res.json({
        id,
        message: 'Signed up',
        ok: true
    })
}

const confirmUser = ({ user, next, password, createUserQuery, req, res }) => {
    user
        ? next(new Error('Display name and/or email already registered'))
        : addNewUser({ password, createUserQuery, req, res })
}

const searchUser = async ({ req, getUserByEmailOrNameQuery, next, createUserQuery, res }) => {
    const { email, name, password } = req.body
    const user = await getUserByEmailOrNameQuery(email, name)
    confirmUser({ user, next, password, createUserQuery, req, res })
}

export const factory = (api: IRestApi, getUserByEmailOrNameQuery: Function, createUserQuery: Function) => () => {
    api.post('/signup', async (req: IRequest, res: IResponse, next: Function) => {
        isValidObject(req.body, requiredFields, optionalFields)
            ? searchUser({ req, getUserByEmailOrNameQuery, next, createUserQuery, res })
            : next(new Error('Invalid credentials'))
    })
}
