import * as React from 'react'
import { runValidationTests } from '../../../../utils/validation'
import {
  isValidDisplayName,
  isValidEmail,
  isValidPassword,
  isPasswordConfirmed
} from '../../../../../shared/utils/validation'
import { alert } from '../../../../styles/constants'
import { getValidationTests } from './validationTests'
import { InputField } from '../../../../components'
import { AuthenticationState } from '../../../../enums/authentication'

interface IProps {
  onSubmitSignup: Function
  updateName: Function
  updatePassword: Function
  updateConfirmationPassword: Function
  updateEmail: Function
  updateErrors: Function
  errors?: string[]
  name: string
  password: string
  confirmationPassword: string
  email: string
  authenticationState: AuthenticationState
}

export const Signup: React.SFC<IProps> = ({
  onSubmitSignup,
  updateName,
  updatePassword,
  updateConfirmationPassword,
  updateEmail,
  updateErrors,
  name,
  password,
  confirmationPassword,
  email,
  errors,
  authenticationState
}) => {
  const validate = () => {
    const validationTests = getValidationTests(
      { password, confirmationPassword, email, name },
      { isPasswordConfirmed, isValidPassword, isValidDisplayName, isValidEmail }
    )
    return runValidationTests(validationTests)
  }

  const onAttemptSubmit = (e) => {
    e.preventDefault()
    const errors: string[] = validate()
    updateErrors(errors)
    if (!errors.length) {
      onSubmitSignup({ email, password, name })
    }
  }

  const isSigningUp = authenticationState === AuthenticationState.signingUp
  const hasSignUpFailed =
    authenticationState === AuthenticationState.signUpFailed
  const hasErrors = !!errors.length

  return (
    <div>
      <div style={{ display: isSigningUp ? 'block' : 'none' }}>
        Loading ...{' '}
      </div>
      <div style={{ display: isSigningUp ? 'none' : 'block' }}>
        <form className="ml4 w-60">
          {hasErrors && <div className={alert}>{errors.join(' ')}</div>}
          {hasSignUpFailed && (
            <div className={alert}>
              {'Display name and/or email already registered.'}
            </div>
          )}
          <div>
            <small>
              Note: Magnitoodz will only use your email for identification
              purposes and to send you important account information, such as
              security notices. It will never give your email to a third party
              or use it for spam.
            </small>
          </div>
          <div className="mt4">
            <InputField
              label="DisplayName"
              placeholder="fred97"
              updateFunction={updateName}
            />
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
            <InputField
              isPassword
              label="Conformatiom Password"
              placeholder="*********"
              updateFunction={updateConfirmationPassword}
            />
          </div>
          <div className="mt4">
            <a onClick={onAttemptSubmit} href="">
              Submit
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
