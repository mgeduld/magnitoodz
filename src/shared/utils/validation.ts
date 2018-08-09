/* tslint:disable max-line-length */
// from http://emailregex.com/
const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const isValidEmail = (email: string) => emailRegexp.test(email)

// adapted from https://unix.stackexchange.com/questions/391866/regex-for-password-restricting-special-characters/391921#391921
const passwordRegexp = /^(?=[a-zA-Z0-9#@$?!%^&*]{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#@$?!%^&*]).*/
export const isValidPassword = (password: string) =>
  passwordRegexp.test(password)

export const isPasswordConfirmed = ({
  password,
  confirmationPassword
}: {
  password: string
  confirmationPassword: string
}) => password === confirmationPassword

export const isValidDisplayName = (displayName: string) =>
  displayName.length > 0 && displayName.length < 80

export const isValidString = (value: string) =>
  typeof value === 'string' && value !== undefined && value.trim() !== ''

export const isValidMagnitude = (magnitude) =>
  !isNaN(magnitude) && magnitude >= 1 && magnitude <= 200000000000
