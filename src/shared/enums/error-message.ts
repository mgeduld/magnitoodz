/* tslint:disable max-line-length */
export enum ErrorMessage {
  badPassword = 'Password must be more than seven characters and contain at least one of the following: lowercase letters, uppercase letters, numbers, and speical characters (#, @, $, ?, !, %, ^&, or *).',
  passwordsDoNotMatch = 'Password and confirmation password must match',
  badDisplayName = 'DisplayName must be have a length that is greater than zero and less than 80.',
  badEmail = 'Email must be a correctly-formed email address.',
  badTitle = 'Title is required.',
  badSpan1Magnitude = 'Span 1 Magnitude must be a number between 1 and 14,000,000,000.',
  badSpan2Magnitude = 'Span 2 Magnitude must be a number between 1 and 14,000,000,000.',
  badSpan1Name = 'Span 1 Name is required.',
  badSpan2Name = 'Span 2 Name is required.'
}
