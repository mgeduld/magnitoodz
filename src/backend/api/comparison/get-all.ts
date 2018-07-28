import { IComparison } from '../../../shared/interfaces/comparison'
import { IRestApi, IRequest, IResponse } from '../../interfaces/express'

export const factory = (api: IRestApi, query: Function) => () => {
    api.get('/', async (_: IRequest, res: IResponse) => {
        const comparisons: IComparison = await query()
        res.json({ ok: true, data: comparisons })
    })
}
