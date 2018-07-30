import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import { MagnitoodzList } from '../../../magnitoodz'
import { Magnitood } from '../../../magnitoodz'
import { IComparison } from '../../../../../shared/interfaces/comparison'

interface IProps {
    magnitood: IComparison
    magnitoodz: IComparison[],
    requestMagnitood: Function
}

export const Container: React.SFC<IProps> = ({ magnitood, magnitoodz, requestMagnitood }) => {
    return (
        <div>
            <Route exact path="/" render={() => {
                return <MagnitoodzList magnitoodz={magnitoodz} />
            }} />
            <Route exact path="/magnitood/:id" render={({ match }) => {
                return (<Magnitood
                    magnitood={magnitood}
                    id={match.params.id}
                    onInit={requestMagnitood}
                />)
            }} />
        </div>
    )
}