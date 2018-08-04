import * as React from 'react'
import { Link } from 'react-router-dom'
import { IComparison } from '../../../../shared/interfaces/comparison'
import { PaginationNav } from '../../../components/index'
import { pagesToDisplay, itemsPerPage } from '../../../components/ui'

interface IProps {
  magnitoodz: IComparison[]
  count: number
  requestMagnitoodz: Function
}

const renderItems = (data: IComparison[]) => {
  return data.map(({ title, user_name, id }: IComparison) => {
    return (
      <li key={id}>
        <Link to={`/magnitood/${id}`}>{title}</Link> by {user_name}
      </li>
    )
  })
}

export const MagnitoodzList: React.SFC<IProps> = ({
  magnitoodz,
  count,
  requestMagnitoodz
}) => {
  return (
    <div>
      <div className="mt4 ml4">{renderItems(magnitoodz)}</div>
      <div className="mt4">
        {count > itemsPerPage && (
          <PaginationNav
            totalItems={count}
            itemsPerPage={itemsPerPage}
            pagesToDisplay={pagesToDisplay}
            onPageSelect={(page: number) => {
              requestMagnitoodz((page - 1) * itemsPerPage)
            }}
          />
        )}
      </div>
    </div>
  )
}
