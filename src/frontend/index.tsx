import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app'

fetch(process.env.SERVER_ORIGIN)
    .then(res => res.json())
    .then(res => console.log('from server', res))

ReactDOM.render(<App />, document.querySelector('#app'))

console.log('front end')

