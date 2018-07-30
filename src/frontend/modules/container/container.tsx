import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import { MagnitoodzList } from '../../modules/magnitoodz/magnitoodz-list'
import { Magnitood } from '../../modules/magnitood'
import { IComparison } from '../../../shared/interfaces/comparison'

interface IProps {
    magnitoodz: IComparison[]
}

export const Container: React.SFC<IProps> = ({ magnitoodz }) => {
    return (
        <div>
            <Route exact path="/" render={() => {
                return <MagnitoodzList magnitoodz={magnitoodz} />
            }} />
            <Route exact path="/magnitood/:id" render={({ match }) => {
                return <Magnitood id={match.params.id} />
            }} />
        </div>
    )
}