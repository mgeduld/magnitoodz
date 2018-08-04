import * as React from 'react'

const FirstPageSetIcon = '<<'
const LastPageSetIcon = '>>'
const PreviousPageSetIcon = '<'
const NextPageSetIcon = '>'
const EllipsisIcon = '...'

// adapted from https://codereview.stackexchange.com/questions/183417/pagination-algorithm-in-js
const getPagesInRange = (currentPage, total = 20, length = 5) => {
  const min = 1
  const displayLength = length > total ? total : length

  let start = currentPage - Math.floor(displayLength / 2)
  start = Math.max(start, min)
  start = Math.min(start, min + total - displayLength)

  return Array.from({ length: displayLength }, (el, i) => start + i)
}

const getPagesMarkup = (range, currentPage, onPageSelect, updateCurrentPage) =>
  range.map((pageNumber, index) => (
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
  ))

interface IProps {
  itemsPerPage: number
  onPageSelect: Function
  currentPage: number
  updateCurrentPage: Function
  totalItems: number
}

export const PaginationNav: React.SFC<IProps> = ({
  itemsPerPage,
  onPageSelect,
  currentPage,
  updateCurrentPage,
  totalItems
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage)
  if (currentPage > pageCount) {
    throw new Error(
      `currentPage is greater than the total number of pages: ${pageCount}`
    )
  }

  const pagesToDisplay = getPagesInRange(currentPage, pageCount, 5)

  const firstPageToDisplay = pagesToDisplay[0]

  const lastPageToDisplay = pagesToDisplay[pagesToDisplay.length - 1]

  const showFirstPageSet = () => {
    updateCurrentPage(1)
    onPageSelect(1)
  }

  const showLastPageSet = () => {
    updateCurrentPage(pageCount)
    onPageSelect(pageCount)
  }

  const showPreviousPageSet = () => {
    const previousPage = currentPage - 1
    if (currentPage > 1) {
      updateCurrentPage(previousPage)
      onPageSelect(previousPage)
    }
  }

  const showNextPageSet = () => {
    const nextPage = currentPage + 1
    if (currentPage < pageCount) {
      updateCurrentPage(nextPage)
      onPageSelect(nextPage)
    }
  }

  return (
    <div className={'flex justify-center'}>
      <div className="pointer w2 tc" onClick={showFirstPageSet}>
        {FirstPageSetIcon}
      </div>
      <div className="pointer w2 tc" onClick={showPreviousPageSet}>
        {PreviousPageSetIcon}
      </div>
      {firstPageToDisplay > 1 ? <div className="w2">{EllipsisIcon} </div> : ''}
      {getPagesMarkup(
        pagesToDisplay,
        currentPage,
        onPageSelect,
        updateCurrentPage
      )}
      {lastPageToDisplay < pageCount ? (
        <div className="w2">{EllipsisIcon}</div>
      ) : (
        ''
      )}
      <div className="pointer w2 tc" onClick={showNextPageSet}>
        {NextPageSetIcon}
      </div>
      <div className="pointer w2 tc" onClick={showLastPageSet}>
        {LastPageSetIcon}
      </div>
    </div>
  )
}
