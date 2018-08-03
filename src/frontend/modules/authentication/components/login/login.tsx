import * as React from 'react'
import { runValidationTests } from '../../../../utils/validation'
import {
  isValidEmail,
  isValidPassword
} from '../../../../../shared/utils/validation'
import { alert } from '../../../../styles/constants'
import { getValidationTests } from './validationTests'
import { InputField } from '../../../../components'
import { AuthenticationState } from '../../../../enums/authentication'

interface IProps {
  onLogin: Function
  updatePassword: Function
  updateEmail: Function
  updateErrors: Function
  errors?: string[]
  password: string
  email: string
  authenticationState: AuthenticationState
}

export const Login: React.SFC<IProps> = ({
  onLogin,
  updatePassword,
  updateEmail,
  updateErrors,
  password,
  email,
  errors,
  authenticationState
}) => {
  const validate = () => {
    const validationTests = getValidationTests(
      { password, email },
      { isValidPassword, isValidEmail }
    )
    return runValidationTests(validationTests)
  }

  const onAttemptLogIn = (e) => {
    e.preventDefault()
    const errors: string[] = validate()
    updateErrors(errors)
    if (!errors.length) {
      onLogin({ email, password })
    }
  }

  const isLoggingIn = authenticationState === AuthenticationState.loggingIn
  const hasLoginFailed = authenticationState === AuthenticationState.logInFailed
  const hasErrors = !!errors.length

  return (
    <div>
      <div style={{ display: isLoggingIn ? 'block' : 'none' }}>
        Loading ...{' '}
      </div>
      <div style={{ display: isLoggingIn ? 'none' : 'block' }}>
        <form className="ml4 w-60">
          {hasErrors && <div className={alert}>{errors.join(' ')}</div>}
          {hasLoginFailed && (
            <div className={alert}>{'Invalid email and/or password.'}</div>
          )}
          <div className="mt4">
            <InputField
              label="Email"
              placeholder="fred@fred.com"
              updateFunction={updateEmail}
            />
            <InputField
              isPassword
              label="Password"
              placeholder="*********"
              updateFunction={updatePassword}
            />
          </div>
          <div className="mt4">
            <a onClick={onAttemptLogIn} href="">
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
