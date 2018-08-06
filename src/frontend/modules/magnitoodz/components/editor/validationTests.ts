import { IValidtionTestsForValue } from '../../../../interfaces/validation'
import { ErrorMessage } from '../../../../../shared/enums/error-message'
import { IComparison } from '../../../../../shared/interfaces/comparison'

export const getValidationTests = (
  {
    title,
    span_1_magnitude,
    span_2_magnitude,
    span_1_name,
    span_2_name
  }: IComparison,
  { isValidString, isValidMagnitude }
): IValidtionTestsForValue[] => {
  return [
    {
      value: title,
      tests: [
        {
          test: isValidString,
          errorMessage: ErrorMessage.badTitle
        }
      ]
    },
    {
      value: span_1_magnitude,
      tests: [
        {
          test: isValidMagnitude,
          errorMessage: ErrorMessage.badSpan1Magnitude
        }
      ]
    },
    {
      value: span_2_magnitude,
      tests: [
        {
          test: isValidMagnitude,
          errorMessage: ErrorMessage.badSpan2Magnitude
        }
      ]
    },
    {
      value: span_1_name,
      tests: [
        {
          test: isValidString,
          errorMessage: ErrorMessage.badSpan1Name
        }
      ]
    },
    {
      value: span_2_name,
      tests: [
        {
          test: isValidString,
          errorMessage: ErrorMessage.badSpan2Name
        }
      ]
    }
  ]
}
