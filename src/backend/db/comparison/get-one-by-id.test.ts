import test from 'ava'
import { factory } from './get-one-by-id'

test('db:comparison:getOneById() makes a connection that returns a promise', async (t: any) => {
  const connection: any = {
    select() {
      return {
        from() {
          return {
            leftJoin() {
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
