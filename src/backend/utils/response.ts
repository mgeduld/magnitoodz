import { IRequest, IResponse } from '../interfaces/express'

export const setUserIdCookie = (req: IRequest, res: IResponse, id: number) => {
  res.cookie('user_id', id, {
    httpOnly: true,
    secure: req.app.get('env') === 'production',
    signed: true
  })
}
