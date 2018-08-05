export const isValidObject = (
  object: Object,
  requiredFields: string[],
  optionalFields: string[] = []
) => {
  const union = [...requiredFields, ...optionalFields]
  const hasAllRequiredFields = requiredFields.every((key) => object[key])
  const hasOnlyRequiredAndOptionalFields = Object.keys(object).every(
    (key) => union.indexOf(key) !== -1
  )
  return hasAllRequiredFields && hasOnlyRequiredAndOptionalFields
}
