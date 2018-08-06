import * as React from 'react'

interface IProps {
  index: number
  pageNumber: number
  currentPage: number
  updateCurrentPage: Function
  onPageSelect: Function
}

export const PageSelector = ({
  index,
  pageNumber,
  currentPage,
  updateCurrentPage,
  onPageSelect
}) => {
  return (
    <span
      className={`${pageNumber === currentPage ? 'b' : 'i'} dib w2 tc pointer`}
      style={{ userSelect: 'none' }}
      key={index}
      onClick={() => {
        updateCurrentPage(pageNumber)
        onPageSelect(pageNumber)
      }}
    >
      {pageNumber}
    </span>
  )
}
