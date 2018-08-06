import test from 'ava'
import { getDouble } from '../../../../shared/test/fixtures'
import {
  getPagesInRange,
  getPageCount,
  showFirstPageSet,
  showLastPageSet,
  showPreviousPageSet,
  showNextPageSet
} from './pagination'

test('pagination-nav:utils:pagination:getPagesInRange', (t: any) => {
  t.deepEqual(
    getPagesInRange(1, 20, 5),
    [1, 2, 3, 4, 5],
    'returns pages at start of range'
  )
  t.deepEqual(
    getPagesInRange(10, 20, 5),
    [8, 9, 10, 11, 12],
    'returns pages in middle of range'
  )
  t.deepEqual(
    getPagesInRange(19, 20, 5),
    [16, 17, 18, 19, 20],
    'reaturns pages at end of range'
  )
  t.deepEqual(
    getPagesInRange(1, 20, 21),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    'returns pages at start of range, called with length greater than total'
  )
})

test('pagination-nav:utils:pagination:getPageCount', (t: any) => {
  t.is(
    getPageCount(20, 5, 1),
    4,
    'gets corrent page count when there is no remainder'
  )
  t.is(
    getPageCount(20, 3, 1),
    7,
    'gets corrent page count when there is a remainder'
  )

  const error = t.throws(() => getPageCount(20, 3, 100))

  t.is(
    error.message,
    'currentPage is greater than the total number of pages: 7'
  )
})

test('pagination-nav:utils:pagination:showFirstPageSet', (t: any) => {
  const updateCurrentPage = getDouble()
  const onPageSelect = getDouble()
  showFirstPageSet({ updateCurrentPage, onPageSelect })()
  t.is(updateCurrentPage.calledWith[0], 1, 'updateCurrentPage called with 1')
  t.is(onPageSelect.calledWith[0], 1, 'onPageSelect called with 1')
})

test('pagination-nav:utils:pagination:showLastPageSet', (t: any) => {
  const updateCurrentPage = getDouble()
  const onPageSelect = getDouble()
  showLastPageSet({ updateCurrentPage, onPageSelect, pageCount: 20 })()
  t.is(updateCurrentPage.calledWith[0], 20, 'updateCurrentPage called with 20')
  t.is(onPageSelect.calledWith[0], 20, 'onPageSelect called with 20')
})

test('pagination-nav:utils:pagination:showPreviousPageSet', (t: any) => {
  let updateCurrentPage = getDouble()
  let onPageSelect = getDouble()
  showPreviousPageSet({ updateCurrentPage, onPageSelect, pageCount: 10 })(3)
  t.is(updateCurrentPage.calledWith[0], 2, 'updateCurrentPage called with 3')
  t.is(onPageSelect.calledWith[0], 2, 'onPageSelect called with 3')

  updateCurrentPage = getDouble()
  onPageSelect = getDouble()
  showPreviousPageSet({
    updateCurrentPage,
    onPageSelect,
    pageCount: 10
  })(1)
  t.is(
    updateCurrentPage.calledWith[0],
    undefined,
    'updateCurrentPage called with undefined because currentPage is 1'
  )
  t.is(
    onPageSelect.calledWith[0],
    undefined,
    'onPageSelect called with undefined because currentPage is 1'
  )
})

test('pagination-nav:utils:pagination:showNextPageSet', (t: any) => {
  let updateCurrentPage = getDouble()
  let onPageSelect = getDouble()
  showNextPageSet({ updateCurrentPage, onPageSelect, pageCount: 10 })(3)
  t.is(updateCurrentPage.calledWith[0], 4, 'updateCurrentPage called with 3')
  t.is(onPageSelect.calledWith[0], 4, 'onPageSelect called with 3')

  updateCurrentPage = getDouble()
  onPageSelect = getDouble()
  showNextPageSet({
    updateCurrentPage,
    onPageSelect,
    pageCount: 10
  })(10)
  t.is(
    updateCurrentPage.calledWith[0],
    undefined,
    'updateCurrentPage called with undefined because currentPage is 10'
  )
  t.is(
    onPageSelect.calledWith[0],
    undefined,
    'onPageSelect called with undefined because currentPage is 10'
  )
})
