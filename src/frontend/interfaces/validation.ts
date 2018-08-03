export interface IValidationTest {
  test: (value: any) => Boolean
  errorMessage: string
}

export interface IValidtionTestsForValue {
  value: any
  tests: IValidationTest[]
}
