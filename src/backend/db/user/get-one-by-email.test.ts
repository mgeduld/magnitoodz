import test from 'ava'
import { factory } from './get-one-by-email'
import { IConnection } from '../../interfaces/connection';

test('db:user:getOneByEmail() makes a connection that returns a promise', async (t: any) => {
    const connection: IConnection = () => {
        return {
            where() {
                return {
                    first() {
                        return Promise.resolve('foo')
                    }
                }
            }
        }
    }
    const getOneByEmail = factory(connection)
    t.truthy(typeof getOneByEmail === 'function')

    const result = await getOneByEmail('foo')
    t.is(result, 'foo')
})