import { IComparison } from '../../../shared/interfaces/comparison'
import { IRestApi, IRequest, IResponse } from '../../interfaces/express'

const mustHave = ['span_1_magnitude', 'span_2_magnitude', 'span_1_name', 'span_2_name', 'user_id']
const canHave = ['description', 'meta', 'span_1_name', 'span_2_name', 'title', 'unit']
const union = [...mustHave, ...canHave]

const buildComparison = (body: { [key: string]: any }): object | null => {
    const hasAllRequiredFields = mustHave.every(key => body[key])
    const hasNoExtras = Object.keys(body).every(key => union.indexOf(key) !== -1)
    if (hasAllRequiredFields && hasNoExtras) {
        return {
            ...body,
            created_at: new Date().toUTCString(),
            updated_at: new Date().toUTCString(),
            rating: 0,
        }
    }
    return null
}

export const factory = (api: IRestApi, userQuery: Function, comparisonQuery: Function) => () => {
    api.post('/', async ({ body }: IRequest, res: IResponse, next: Function) => {
        const { user_id } = body
        const user = await userQuery(user_id)
        if (!user) {
            next(new Error(`Invalid user id ${user_id}`))
        } else {
            const comparison: Object | null = buildComparison(body)
            if (comparison) {
                await comparisonQuery(comparison)
                res.json({ ok: true })
            } else {
                next(new Error(`Invalid criteria in ${body}`))
            }
        }
    })
}
