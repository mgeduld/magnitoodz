import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withState, lifecycle } from 'recompose';
import { Signup } from './signup';
import { AuthenticationState } from '../../../../enums/authentication';

export const ComposedSignup: React.ComponentClass<any> = compose(
  withRouter,
  withState('name', 'updateName', ''),
  withState('email', 'updateEmail', ''),
  withState('password', 'updatePassword', ''),
  withState('confirmationPassword', 'updateConfirmationPassword', ''),
  withState('errors', 'updateErrors', []),
  lifecycle({
    componentWillReceiveProps({ authenticationState, history }) {
      if (authenticationState === AuthenticationState.loggedIn) {
        history.push('/');
      }
    }
  })
)(Signup);
