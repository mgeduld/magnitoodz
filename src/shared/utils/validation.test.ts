import test from 'ava'
import {
  isPasswordConfirmed,
  isValidDisplayName,
  isValidEmail,
  isValidPassword,
  isValidString,
  isValidMagnitude
} from './validation'

test('utils::validation::isValidEmail', (t: any) => {
  t.truthy(isValidEmail('foo@bar.com'), 'Simple email')
  t.truthy(isValidEmail('foo@bar.bar.com'), 'Email with dot characters after @')
  t.truthy(
    isValidEmail('foo.foo@bar.BAR.org'),
    'Email with upper-case and dot characters'
  )
  t.truthy(
    isValidEmail('f1234499.foo@bar25.34.me'),
    'Email with numbers, dots, and upper-case characters'
  )
  t.falsy(isValidEmail('foobar.com'), 'Email with missing @')
  t.falsy(isValidEmail('foo@bar'), 'Email with missing .xx')
  t.falsy(isValidEmail('foo foo@bar.com'), 'Email with space')
})

test('utils::validation::isValidPassword', (t: any) => {
  t.truthy(
    isValidPassword('abcDefg890!'),
    'Password with allowed number of characters'
  )
  t.falsy(
    isValidPassword('Def890!'),
    'Password with wrong number of characters'
  )
  t.truthy(
    isValidPassword('abcDefg890!'),
    'Password has upper/lowercase litters, numbers, and symbols'
  )
  t.falsy(isValidPassword('abcDefg890_'), 'Password has invalid symbol')
  t.falsy(isValidPassword('abcdefg890!'), 'Password has no uppercase letters')
  t.falsy(isValidPassword('ABCDEFG890!'), 'Password has no lowercase letters')
  t.falsy(isValidPassword('abcDefghij!'), 'Password has no numbers')
  t.falsy(isValidPassword('abcDefg890z'), 'Password has no symbols')
})

test('utils::validation::isPasswordConfirmed', (t: any) => {
  t.truthy(
    isPasswordConfirmed({ password: 'foo', confirmationPassword: 'foo' }),
    'Passwords match'
  )
  t.falsy(
    isPasswordConfirmed({ password: 'foo', confirmationPassword: 'FOO' }),
    'Passwords do not match'
  )
})

test('utils::validation::isValidDisplayName', (t: any) => {
  t.truthy(isValidDisplayName('M'), 'DisplayName has at least one character')
  t.truthy(
    isValidDisplayName(
      '0123456789012345678901234567890123456789012345678901234567890123456789012345678'
    ),
    'DisplayName has less-than 80 characters'
  )
  t.falsy(
    isValidDisplayName(
      'x0123456789012345678901234567890123456789012345678901234567890123456789012345678'
    ),
    'DisplayName has 80 characters'
  )
  t.falsy(
    isValidDisplayName(
      'xx0123456789012345678901234567890123456789012345678901234567890123456789012345678'
    ),
    'DisplayName has 80+ characters'
  )
  t.falsy(isValidDisplayName(''), 'DisplayName has no character')
})

test('utils::validation::isValidString', (t: any) => {
  t.truthy(isValidString('cat'), 'cat is a valid string')
  t.truthy(isValidString('42'), '"42" is a valid string')
  t.falsy(isValidString(''), 'the empty string is not a valid string')
  t.falsy(isValidString('     '), 'a string of spaces is not a valid string')
  t.truthy(
    isValidString('  cat   '),
    'a string of characters with spaces before/after is a valid string'
  )
})

test('utils::validation::isValidMagnitude', (t: any) => {
  t.truthy(isValidMagnitude(5000), '5000 is a valid magnitude')
  t.truthy(isValidMagnitude(1), '1 is a valid magnitude')
  t.truthy(isValidMagnitude(14000000000), '14000000000 is a valid magnitude')
  t.falsy(isValidMagnitude(0), '0 is not a valid magnitude')
  t.falsy(isValidMagnitude(-5000), '-5000 is not a valid magnitude')
  t.falsy(isValidMagnitude(14000000001), '14000000001 is not a valid magnitude')
})
