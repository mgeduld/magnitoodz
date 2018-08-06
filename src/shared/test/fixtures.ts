export const getDouble = (returnValue?: any) => {
  const fn: any = function fn(...args: any[]) {
    fn['calledWith'] = args
    return returnValue
  }
  fn.calledWith = []
  return fn
}
