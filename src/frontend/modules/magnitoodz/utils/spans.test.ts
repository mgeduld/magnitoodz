import test from 'ava'
import {
  getMagnitudes,
  getMagnitudesAndNames,
  getSmallMagnitudeChunkSize,
  hasFractionalPart,
  getChunks
} from './spans'

test('magnitoodz:utils:spans::getMagnitudes', (t: any) => {
  t.deepEqual(
    getMagnitudes({
      bigMagnitude: 14000000000,
      smallMagnitude: 200000,
      maxChunks: 100
    }),
    [140000000, 1400000, 14000, 14000]
  )
})

test('magnitoodz:utils:spans:getSmallMagnitudeChunkSize', (t: any) => {
  t.is(getSmallMagnitudeChunkSize(100000, 1000), 0.1)
})

test('magnitoodz:utils:spans:hasFractionalPart', (t: any) => {
  t.truthy(hasFractionalPart(10.33), 'yup')
  t.falsy(hasFractionalPart(10), 'nope')
})

test('magnitoodz:utils:spans:getChunks', (t: any) => {
  t.is(getChunks(5).join(''), '-----')
})

test('magnitoodz:utils:spans:getMagnitudesAndNames', (t: any) => {
  const obj1 = getMagnitudesAndNames(20, 10, 'a', 'b')
  t.deepEqual(
    obj1,
    {
      bigMagnitude: 20,
      bigMagnitudeName: 'a',
      smallMagnitude: 10,
      smallMagnitudeName: 'b'
    },
    'big magnitude is first arg'
  )

  const obj2 = getMagnitudesAndNames(10, 20, 'a', 'b')
  t.deepEqual(
    obj2,
    {
      bigMagnitude: 20,
      bigMagnitudeName: 'b',
      smallMagnitude: 10,
      smallMagnitudeName: 'a'
    },
    'big magnitude is second arg'
  )
})
