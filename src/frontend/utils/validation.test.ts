import test from 'ava'
import { getValidationErrors, runValidationTests } from './validation'
import { IValidationTest, IValidtionTestsForValue } from '../interfaces/validation';

test('utils::validation::getValidationErrors returns two out of three error messages', (t: any) => {
    const validationTests: IValidationTest[] = [
        { test: (v) => v.length === 4, errorMessage: 'a' },
        { test: (v) => v.charAt(0) === 'f', errorMessage: 'b' },
        { test: (v) => typeof v === 'number', errorMessage: 'c' },
    ]
    t.deepEqual(getValidationErrors('foo', validationTests), ['a', 'c'])
})

test('utils::validation:runValidationTests', (t: any) => {
    const validationTests: IValidtionTestsForValue[] = [
        {
            value: 'foo',
            tests: [
                { test: (v) => v.length === 4, errorMessage: 'a' },
                { test: (v) => v.charAt(0) === 'f', errorMessage: 'b' },
                { test: (v) => typeof v === 'number', errorMessage: 'c' },
            ]
        },
        {
            value: 'bar',
            tests: [
                { test: (v) => v.length === 3, errorMessage: 'x' },
                { test: (v) => v.charAt(0) === 'x', errorMessage: 'y' },
                { test: (v) => typeof v === 'string', errorMessage: 'z' },
            ]
        },
        {
            value: 'baz',
            tests: [
                { test: (v) => v.length === 3, errorMessage: 'k' },
                { test: (v) => v.charAt(0) === 'b', errorMessage: 'l' },
                { test: (v) => typeof v === 'string', errorMessage: 'm' },
            ]
        }
    ]

    t.deepEqual(runValidationTests(validationTests), ['a', 'c', 'y'])
})