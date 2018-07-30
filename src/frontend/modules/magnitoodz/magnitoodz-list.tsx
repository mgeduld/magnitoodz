import * as React from 'react'
import { Link } from 'react-router-dom'
import { IComparison } from '../../../shared/interfaces/comparison'

interface IProps {
    magnitoodz: IComparison[]
}

const renderItems = (data: IComparison[]) => {
    return data.map(({ title, id }: IComparison) => {
        return (
            <li key={id}><Link to={`/magnitood/${id}`}>{title}</Link></li>
        )
    })
}

export const MagnitoodzList: React.SFC<IProps> = ({ magnitoodz }) => {
    return (
        <div>
            {renderItems(magnitoodz)}
        </div>
    )
}