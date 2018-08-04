import { compose, withState, defaultProps } from 'recompose'
import { PaginationNav as PaginationNavComponent } from './pagination-nav'

export const PaginationNav: any = compose(
  defaultProps({
    startPage: 1,
    itemsPerPage: 10,
    numPagesToDisplay: 5,
    onPageSelect: () => {}
  }),
  withState('currentPage', 'updateCurrentPage', ({ startPage }) => startPage)
)(PaginationNavComponent)
