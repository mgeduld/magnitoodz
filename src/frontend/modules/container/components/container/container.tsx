import * as React from 'react'
import { Route } from 'react-router-dom'
import { MagnitoodzList } from '../../../magnitoodz'
import { Magnitood } from '../../../magnitoodz'
import { Editor } from '../../../magnitoodz'
import { IComparison } from '../../../../../shared/interfaces/comparison'
import 'tachyons/css/tachyons.css'

interface IProps {
    magnitood: IComparison
    magnitoodz: IComparison[],
    requestMagnitood: Function,
    postMagnitood: Function
}

export const Container: React.SFC<IProps> = ({ magnitood, magnitoodz, requestMagnitood, postMagnitood }) => {
    return (
        <div className="ma3 bg-black">
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
            <Route exact path="/create" render={() => {
                return (<Editor onSubmitMagnitood={(magnitood: IComparison) => { postMagnitood(magnitood) }} />)
            }} />
        </div>
    )
}