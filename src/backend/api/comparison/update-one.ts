import { IRestApi, IRequest, IResponse } from '../../interfaces/express'
import { isValidObject } from '../../utils/validation'
import { ErrorMessage } from '../../enums/error-message'
import { hasPermissions } from './middleware/has-permssions'

const requiredFields = [
  'span_1_magnitude',
  'span_2_magnitude',
  'span_1_name',
  'span_2_name',
  'title',
  'user_id'
]
const optionalFields = ['description', 'meta', 'unit', 'id']

const buildComparison = (body: { [key: string]: any }): object | null => {
  if (isValidObject(body, requiredFields, optionalFields)) {
    return {
      ...body,
      updated_at: new Date().toUTCString()
    }
  }
  return null
}

export const factory = (
  api: IRestApi,
  userQuery: Function,
  comparisonQuery: Function
) => () => {
  api.put(
    '/',
    hasPermissions,
    async ({ body }: IRequest, res: IResponse, next: Function) => {
      const { user_id } = body
      const user = await userQuery(user_id)
      if (!user) {
        next(new Error(`${ErrorMessage.invalidUserId}${user_id}`))
      } else {
        const comparison: Object | null = buildComparison(body)
        if (comparison) {
          await comparisonQuery(comparison)
          res.json({ ok: true })
        } else {
          next(new Error(`${ErrorMessage.invalidCriteria}${body}`))
        }
      }
    }
  )
}
