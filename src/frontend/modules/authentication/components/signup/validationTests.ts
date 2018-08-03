import { IValidtionTestsForValue } from '../../../../interfaces/validation'
import { ICredentials } from '../../../../../shared/interfaces/authentication'
import { ErrorMessage } from '../../../../../shared/enums/error-message'

export const getValidationTests = (
  { password, confirmationPassword, email, name }: ICredentials,
  { isValidPassword, isPasswordConfirmed, isValidDisplayName, isValidEmail }
): IValidtionTestsForValue[] => {
  return [
    {
      value: password,
      tests: [
        {
          test: isValidPassword,
          errorMessage: ErrorMessage.badPassword
        }
      ]
    },
    {
      value: { password, confirmationPassword },
      tests: [
        {
          test: isPasswordConfirmed,
          errorMessage: ErrorMessage.passwordsDoNotMatch
        }
      ]
    },
    {
      value: name,
      tests: [
        {
          test: isValidDisplayName,
          errorMessage: ErrorMessage.badDisplayName
        }
      ]
    },
    {
      value: email,
      tests: [
        {
          test: isValidEmail,
          errorMessage: ErrorMessage.badEmail
        }
      ]
    }
  ]
}
