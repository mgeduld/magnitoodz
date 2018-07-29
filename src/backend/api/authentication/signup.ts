import { IRestApi, IRequest, IResponse } from '../../interfaces/express'
import bcrypt = require('bcrypt')

import { Authentication } from '../../enums/authentication'
import { isValidObject } from '../../utils/validation'
import { IUser } from '../../interfaces/user'

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

const setUserIdCookie = (req: IRequest, res: IResponse, id: number) => {
    res.cookie('user_id', id, {
        httpOnly: true,
        secure: req.app.get('env') === 'production',
        signed: true
    })
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

const maybeAddNewUser = ({ user, next, password, createUserQuery, req, res }) => {
    if (user) {
        next(new Error('Display name and/or email already registered'))
    } else {
        addNewUser({ password, createUserQuery, req, res })
    }
}

export const factory = (api: IRestApi, getUserByEmailOrNameQuery: Function, createUserQuery: Function) => () => {
    api.post('/signup', async (req: IRequest, res: IResponse, next: Function) => {
        if (isValidObject(req.body, requiredFields, optionalFields)) {
            const { email, name, password } = req.body
            const user = await getUserByEmailOrNameQuery(email, name)
            maybeAddNewUser({ user, next, password, createUserQuery, req, res })
        } else {
            next(new Error('Invalid credentials'))
        }
    })
}
