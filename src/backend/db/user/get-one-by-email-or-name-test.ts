import test from 'ava'
import { factory } from './get-one-by-email-or-name'
import { IConnection } from '../../interfaces/connection';

test('db:user:getOneById() runs make a connection that returns a promise', async (t: any) => {
    const connection: IConnection = () => {
        return {
            where() {
                return {
                    orWhere() {
                        return {
                            first() {
                                return Promise.resolve('foo')
                            }
                        }
                    }
                }
            }
        }
    }
    const getOneByEmailOrName = factory(connection)
    t.truthy(typeof getOneByEmailOrName === 'function')

    const result = await getOneByEmailOrName('foo', 'bar')
    t.is(result, 'foo')
})