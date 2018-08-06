import * as React from 'react'
import { Rune } from './enums/rune'
import { PaginationControl } from './pagination-control'
import { IPageNavHandlers } from './interfaces/pagination'
import {
  getPagesInRange,
  getPageCount,
  showFirstPageSet,
  showLastPageSet,
  showPreviousPageSet,
  showNextPageSet
} from './utils/pagination'
import { PageSelector } from './page-selector'

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
  const pageCount = getPageCount(totalItems, itemsPerPage, currentPage)
  const pagesToDisplay = getPagesInRange(currentPage, pageCount, 5)
  const firstPageToDisplay = pagesToDisplay[0]
  const lastPageToDisplay = pagesToDisplay[pagesToDisplay.length - 1]

  const pageNavHandlers: IPageNavHandlers = {
    pageCount,
    updateCurrentPage,
    onPageSelect
  }

  return (
    <div className={'flex justify-center'}>
      <PaginationControl
        rune={Rune.FirstPageSetIcon}
        clickHandler={() => showFirstPageSet(pageNavHandlers)()}
      />
      <PaginationControl
        rune={Rune.PreviousPageSetIcon}
        clickHandler={() => showPreviousPageSet(pageNavHandlers)(currentPage)}
      />
      {firstPageToDisplay > 1 ? (
        <div className="w2">{Rune.EllipsisIcon} </div>
      ) : (
        ''
      )}
      {pagesToDisplay.map((pageNumber, index) => (
        <PageSelector
          key={index}
          index={index}
          pageNumber={pageNumber}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
          onPageSelect={onPageSelect}
        />
      ))}
      {lastPageToDisplay < pageCount ? (
        <div className="w2">{Rune.EllipsisIcon}</div>
      ) : (
        ''
      )}
      <PaginationControl
        rune={Rune.NextPageSetIcon}
        clickHandler={() => showNextPageSet(pageNavHandlers)(currentPage)}
      />
      <PaginationControl
        rune={Rune.LastPageSetIcon}
        clickHandler={() => showLastPageSet(pageNavHandlers)()}
      />
    </div>
  )
}
