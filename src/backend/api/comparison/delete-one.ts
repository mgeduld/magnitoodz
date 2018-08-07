import { IRestApi, IRequest, IResponse } from '../../interfaces/express'
import { hasPermissions } from './middleware/has-permssions'

export const factory = (api: IRestApi, query: Function) => () => {
  api.delete(
    '/',
    hasPermissions,
    async ({ body }: IRequest, res: IResponse) => {
      const { id } = body
      await query(id)
      res.json({ ok: true })
    }
  )
}
