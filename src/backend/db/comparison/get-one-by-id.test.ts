import test from 'ava'
import { factory } from './get-one-by-id'
import { IConnection } from '../../interfaces/connection';

test('db:comparison:getOneById() runs make a connection that returns a promise', async (t: any) => {
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
    const getOneById = factory(connection)
    t.truthy(typeof getOneById === 'function')

    const result = await getOneById(1)
    t.is(result, 'foo')
})