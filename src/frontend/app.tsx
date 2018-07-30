import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './store'
import 'tachyons/css/tachyons.css'
import { Container } from './modules/container'

export const App: React.SFC<null> = () => {
    return (
        <Provider store={store} >
            <Router>
                <Container />
            </Router>
        </Provider>
    )
}
