import {
  IValidationTest,
  IValidtionTestsForValue
} from '../interfaces/validation'

export const getValidationErrors = (value: any, tests: IValidationTest[]) => {
  return tests.reduce(
    (errorMessages: string[], validationTest: IValidationTest): string[] => {
      const { test, errorMessage } = validationTest
      if (!test(value)) {
        return [...errorMessages, errorMessage]
      }
      return errorMessages
    },
    []
  )
}

export const runValidationTests = (tests: IValidtionTestsForValue[]) => {
  return tests.reduce(
    (
      errorMessages: string[],
      testsForValue: IValidtionTestsForValue
    ): string[] => {
      const { tests, value } = testsForValue
      const newErrors = getValidationErrors(value, tests)
      if (newErrors.length) {
        return [...errorMessages, ...newErrors]
      }
      return errorMessages
    },
    []
  )
}
