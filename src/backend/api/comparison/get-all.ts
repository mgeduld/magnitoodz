import { IComparison } from '../../../shared/interfaces/comparison'
import { IRestApi, IRequest, IResponse } from '../../interfaces/express'
import { defaultOffset, defaultLimit } from '../../constants/queries'
import { ICount } from '../../interfaces/count'

export const factory = (
  api: IRestApi,
  magnitoodzQuery: Function,
  countQuery: Function
) => () => {
  api.get('/', async (req: IRequest, res: IResponse) => {
    const { offset, limit } = req.query
    const normalizedOffset = isNaN(Number(offset))
      ? defaultOffset
      : Number(offset)
    const normalizedLimit = isNaN(Number(limit)) ? defaultLimit : Number(limit)
    const countRecords: ICount[] = await countQuery()
    const comparisons: IComparison = await magnitoodzQuery(
      normalizedOffset,
      normalizedLimit
    )
    res.json({
      ok: true,
      data: comparisons,
      count: Number(countRecords[0].count)
    })
  })
}
