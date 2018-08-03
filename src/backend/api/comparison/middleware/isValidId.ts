import { IRequest, IResponse } from '../../../interfaces/express'

export const isValidId = (req: IRequest, res: IResponse, next: Function) => {
  const { id } = req.params
  if (isNaN(id)) {
    next(new Error(`Invalid id ${id}`))
  } else {
    next()
  }
}
