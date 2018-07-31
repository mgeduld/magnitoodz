import * as React from 'react'
import { Link } from 'react-router-dom'
import { IComparison } from '../../../../shared/interfaces/comparison'

interface IProps {
    magnitoodz: IComparison[]
}

const renderItems = (data: IComparison[]) => {
    return data.map(({ title, user_name, id }: IComparison) => {
        return (
            <li key={id}><Link to={`/magnitood/${id}`}>{title}</Link> by {user_name}</li>
        )
    })
}

export const MagnitoodzList: React.SFC<IProps> = ({ magnitoodz }) => {
    return (
        <div>
            <div className="w-60 bb">
                <p>Magnitoodz lets you compare sizes, distances, timespans and other numbers, displayimg the results as line charts, so that they can be easily visualized.</p>
                <p>It was inspired by Carl Sagan's <a href="https://en.wikipedia.org/wiki/Cosmic_Calendar">Cosmic Calendar</a>, which illustrated huge differences between the age of the Universe and the age of our civilization.</p>
                <p className="mt1">codebase: <a href="https://github.com/mgeduld/magnitoodz">https://github.com/mgeduld/magnitoodz</a></p>
            </div>
            <div className="mt4 ml4">
                <p className="mt4 mb4"><Link to="/create">[+] New Magnitood</Link></p>
                {renderItems(magnitoodz)}
            </div>
        </div>
    )
}