import test from 'ava'
import { isValidId } from './isValidId'

test('comparison::middleware::isValidId makes sure param.id is a number', (t: any) => {
  let actual1
  let actual2
  let actual3

  isValidId(
    { params: { id: 25 } },
    { json: () => Promise.resolve() },
    (value) => {
      actual1 = value
    }
  )
  t.is(actual1, undefined, 'no error with 25')

  isValidId(
    { params: { id: '2' } },
    { json: () => Promise.resolve() },
    (value) => {
      actual2 = value
    }
  )

  t.is(actual1, undefined, 'no error with "2"')

  isValidId(
    { params: { id: 'cat' } },
    { json: () => Promise.resolve() },
    (value) => {
      actual3 = value
    }
  )

  t.deepEqual(actual3, new Error('Invalid id cat'), 'error with "cat"')
})
