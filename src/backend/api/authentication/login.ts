import bcrypt = require('bcrypt')
import { IRestApi, IRequest, IResponse } from '../../interfaces/express'
import { isValidObject } from '../../utils/validation'
import { setUserIdCookie } from '../../utils/response'
import { ErrorMessage } from '../../enums/error-message'

const respondOkToClient = ({ req, res, user }) => {
  setUserIdCookie(req, res, user.id)
  res.json({
    id: user.id,
    name: user.name,
    message: 'Logged in',
    ok: true
  })
}

const confirmPassword = async ({ password, user, req, res, next }) => {
  const ok = await bcrypt.compare(password, user.password)
  ok
    ? respondOkToClient({ req, res, user })
    : next(new Error(ErrorMessage.invalidCredentials))
}

const searchForUser = async ({ getUserByEmailQuery, req, res, next }) => {
  const { email, password } = req.body
  const user = await getUserByEmailQuery(email)
  user
    ? confirmPassword({ password, user, req, res, next })
    : next(new Error(ErrorMessage.invalidCredentials))
}

export const factory = (api: IRestApi, getUserByEmailQuery: Function) => () => {
  api.post('/login', async (req: IRequest, res: IResponse, next: Function) => {
    isValidObject(req.body, ['email', 'password'])
      ? searchForUser({ getUserByEmailQuery, req, res, next })
      : next(new Error(ErrorMessage.invalidCredentials))
  })
}
