import { IComparison } from '../../../shared/interfaces/comparison'
import { IRestApi, IRequest, IResponse } from '../../interfaces/express'
import { isValidId } from './middleware/isValidId'

export const factory = (api: IRestApi, query: Function) => () => {
  api.get(
    '/magnitood/:id',
    isValidId,
    async (req: IRequest, res: IResponse) => {
      const { id } = req.params
      const comparison: IComparison = await query(id)
      res.json({ ok: true, data: comparison })
    }
  )
}
