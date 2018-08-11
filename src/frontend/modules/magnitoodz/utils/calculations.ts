export const getMagnitudes = (
  bigMagnitude,
  smallMagnitude,
  spanLength,
  magnitudes = []
) => {
  if (!magnitudes.length) {
    magnitudes.push(bigMagnitude)
  }
  if (smallMagnitude < bigMagnitude / spanLength) {
    const lessBigMagnitude = bigMagnitude / spanLength
    magnitudes.push(lessBigMagnitude)
    return getMagnitudes(
      lessBigMagnitude,
      smallMagnitude,
      spanLength,
      magnitudes
    )
  }
  return magnitudes
}

export const isWholeNumber = (num) => num % 1 === 0
