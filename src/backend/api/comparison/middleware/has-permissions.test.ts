/* tslint:disable max-line-length */
import test from 'ava'
import { hasPermissions } from './has-permssions'

test('comparison::middleware::hasPermissions calls next with no args when user_id matches cookie value', (t: any) => {
  let nextCalled
  let nextCalledWith
  let statusCalled
  let statusCalledWith

  const next = (value: any) => {
    nextCalled = true
    nextCalledWith = value
  }

  const req = {
    signedCookies: {
      user_id: '123'
    },
    body: {
      user_id: 123
    }
  }

  const res = {
    status(value: number) {
      statusCalled = true
      statusCalledWith = value
    }
  }

  hasPermissions(req, res, next)
  t.truthy(nextCalled, 'next() called')
  t.is(nextCalledWith, undefined, 'next called with no arg')
  t.falsy(statusCalled, 'status() not called')
  t.is(statusCalledWith, undefined, 'status() not called so no arg')
})

test('comparison::middleware::hasPermissions calls res and next with error when args when user_id does not matche cookie value', (t: any) => {
  let nextCalled
  let nextCalledWith
  let statusCalled
  let statusCalledWith

  const next = (value: any) => {
    nextCalled = true
    nextCalledWith = value
  }

  const req = {
    signedCookies: {
      user_id: '123'
    },
    body: {
      user_id: 456
    }
  }

  const res = {
    status(value: number) {
      statusCalled = true
      statusCalledWith = value
    }
  }

  hasPermissions(req, res, next)
  t.truthy(nextCalled, 'next() called')
  t.deepEqual(
    nextCalledWith,
    new Error('Unauthorized'),
    'next called with error'
  )
  t.truthy(statusCalled, 'status() called')
  t.is(statusCalledWith, 401, 'status() called with 401')
})
