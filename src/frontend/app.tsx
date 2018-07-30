import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './store'
import 'tachyons/css/tachyons.css'
import { ComposedConnectedContainer } from './modules/container'

export const App: React.SFC<null> = () => {
    return (
        <Provider store={store} >
            <Router>
                <ComposedConnectedContainer />
            </Router>
        </Provider>
    )
}

/*

<div className="bg-blue">
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/A">A</Link></li>
                        <li><Link to="/B">B</Link></li>
                    </ul>
                    <Route exact={true} path="/" render={() => {
                        return <div>HOME</div>
                    }} />
                    <Route exect={true} path="/A" render={() => {
                        return <div>A</div>
                    }} />
                    <Route exect={true} path="/B" render={() => {
                        return <div><ConnectedMagnitoozList /></div>
                    }} />
                </div>

                */
