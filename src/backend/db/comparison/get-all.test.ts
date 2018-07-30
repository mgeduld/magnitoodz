import test from 'ava'
import { factory } from './get-all'
import { IConnection } from '../../interfaces/connection';

test('db:comparison:getAll() makes a connection that returns a promise', async (t: any) => {
    const connection: any = {
        select() {
            return {
                from() {
                    return {
                        leftJoin() {
                            return Promise.resolve('foo')
                        }
                    }
                }
            }
        }
    }
    const getAll = factory(connection)
    t.truthy(typeof getAll === 'function')

    const result = await getAll()
    t.is(result, 'foo')
})