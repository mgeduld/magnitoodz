import text, { test } from 'ava'
import { setUserIdCookie } from './response'

test('utils::response::setUserCookie calls response.cookie()', (t: any) => {
    let actual
    const req = {
        app: {
            get: () => { }
        }
    }
    const res = {
        cookie(key: string, value: any, config: object) {
            actual = {
                [key]: value,
                config
            }
        }
    }

    setUserIdCookie(req, res, 123)

    t.deepEqual(actual, {
        user_id: 123, config: {
            httpOnly: true,
            secure: false,
            signed: true
        }
    })
})

test('utils::response::setUserCookie calls response.cookie() in production', (t: any) => {
    let actual
    const req = {
        app: {
            get: () => 'production'
        }
    }
    const res = {
        cookie(key: string, value: any, config: object) {
            actual = {
                [key]: value,
                config
            }
        }
    }

    setUserIdCookie(req, res, 123)

    t.deepEqual(actual, {
        user_id: 123, config: {
            httpOnly: true,
            secure: true,
            signed: true
        }
    })
})