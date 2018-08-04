// Note that in Postgres, count returns a bigint type which will be a String and not a Number
// -- https://knexjs.org/#Builder-count

export interface ICount {
  count: string
}
