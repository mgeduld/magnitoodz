import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withState, lifecycle } from 'recompose'
import { Login } from './login'
import { AuthenticationState } from '../../../../enums/authentication'

export const ComposedLogin: React.ComponentClass<any> = compose(
  withRouter,
  withState('email', 'updateEmail', ''),
  withState('password', 'updatePassword', ''),
  withState('errors', 'updateErrors', []),
  lifecycle({
    componentWillReceiveProps({ authenticationState, history }) {
      if (authenticationState === AuthenticationState.loggedIn) {
        history.push('/')
      }
    }
  })
)(Login)
