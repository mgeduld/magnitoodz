import * as React from 'react'

import { IPageNavHandlers } from '../interfaces/pagination'

// adapted from https://codereview.stackexchange.com/questions/183417/pagination-algorithm-in-js
export const getPagesInRange = (
  currentPage: number,
  total: number,
  length: number
) => {
  const min = 1
  const displayLength = length > total ? total : length

  let start = currentPage - Math.floor(displayLength / 2)
  start = Math.max(start, min)
  start = Math.min(start, min + total - displayLength)

  return Array.from({ length: displayLength }, (el, i) => start + i)
}

export const getPageCount = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
) => {
  const count = Math.ceil(totalItems / itemsPerPage)
  if (currentPage > count) {
    throw new Error(
      `currentPage is greater than the total number of pages: ${count}`
    )
  }
  return count
}

export const showFirstPageSet = ({
  updateCurrentPage,
  onPageSelect
}: IPageNavHandlers) => () => {
  updateCurrentPage(1)
  onPageSelect(1)
}

export const showLastPageSet = ({
  pageCount,
  updateCurrentPage,
  onPageSelect
}: IPageNavHandlers) => () => {
  updateCurrentPage(pageCount)
  onPageSelect(pageCount)
}

export const showPreviousPageSet = ({
  updateCurrentPage,
  onPageSelect
}: IPageNavHandlers) => (currentPage: number) => {
  const previousPage = currentPage - 1
  if (currentPage > 1) {
    updateCurrentPage(previousPage)
    onPageSelect(previousPage)
  }
}

export const showNextPageSet = ({
  pageCount,
  updateCurrentPage,
  onPageSelect
}: IPageNavHandlers) => (currentPage: number) => {
  const nextPage = currentPage + 1
  if (currentPage < pageCount) {
    updateCurrentPage(nextPage)
    onPageSelect(nextPage)
  }
}
