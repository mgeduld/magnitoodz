import * as React from 'react'
import { Link } from 'react-router-dom'
import { store } from '../../store'
import { requestMagnitood } from '../container/action-creators';

interface IProps {
    id: number
}

export const Magnitood: React.SFC<IProps> = ({ id }) => {
    store.dispatch(requestMagnitood(id))
    return (<div>Magnitood: {id} <Link to="/">home</Link></div>)
}


