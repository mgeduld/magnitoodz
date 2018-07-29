import { IRestApi, IRequest, IResponse } from '../../interfaces/express'

export const factory = (api: IRestApi) => () => {
    api.get('/logout', (req: IRequest, res: IResponse, next: Function) => {
        res.clearCookie('user_id')
        res.json({
            message: 'Logged out',
            ok: true
        })
    })
}

