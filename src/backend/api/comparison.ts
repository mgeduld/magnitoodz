import { Request, Response, Router } from 'express'

import { getAll } from '../db/comparison'

export const api: Router = Router()

api.get('/', (_: Request, res: Response) => {
    getAll()
        .then(comparisons => {
            res.json({
                ok: true,
                data: comparisons
            })
        })
});
