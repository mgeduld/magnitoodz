import * as React from 'react'
import { Link } from 'react-router-dom'
import { IComparison } from '../../../../shared/interfaces/comparison'
import { PaginationNav } from '../../../components/index'

interface IProps {
  magnitoodz: IComparison[]
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

export const MagnitoodzList: React.SFC<IProps> = ({ magnitoodz }) => {
  return (
    <div>
      <div className="mt4 ml4">{renderItems(magnitoodz)}</div>
      <PaginationNav
        totalItems={100}
        pagesToDisplay={10}
        onPageSelect={(v) => {
          console.log(v)
        }}
      />
    </div>
  )
}
