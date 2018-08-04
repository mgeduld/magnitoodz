import { IComparison } from '../../../shared/interfaces/comparison'
import { IRestApi, IRequest, IResponse } from '../../interfaces/express'
import { defaultOffset, defaultLimit } from '../../constants/queries'

export const factory = (api: IRestApi, query: Function) => () => {
  api.get('/', async (req: IRequest, res: IResponse) => {
    const { offset, limit } = req.query
    const normalizedOffset = isNaN(Number(offset))
      ? defaultOffset
      : Number(offset)
    const normalizedLimit = isNaN(Number(limit)) ? defaultLimit : Number(limit)
    const comparisons: IComparison = await query(
      normalizedOffset,
      normalizedLimit
    )
    res.json({ ok: true, data: comparisons })
  })
}
