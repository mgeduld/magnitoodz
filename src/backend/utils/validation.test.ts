import test from 'ava'

import { isValidObject } from './validation'

const requiredFields = ['a', 'b']
const optionalFields = ['c', 'd']

test('utils::validation::isValidObject is true when object has all required fields', (t: any) => {
    t.truthy(isValidObject({ a: 1, b: 2 }, requiredFields))
})

test('utils::validation::isValidObject is false when object is missing required fields', (t: any) => {
    t.falsy(isValidObject({ a: 1 }, requiredFields))
})

test('utils::validation::isValidObject is true when object has only required fields and optional fields', (t: any) => {
    t.truthy(isValidObject({ a: 1, b: 2, c: 3 }, requiredFields, optionalFields))
})

test('utils::validation::isValidObject is false when object has non-sepecified fields', (t: any) => {
    t.falsy(isValidObject({ a: 1, b: 2, c: 3, e: 4 }, requiredFields, optionalFields))
})
