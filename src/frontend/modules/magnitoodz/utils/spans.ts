import { range } from 'lodash'
import { Runes } from '../enums/runes'
import { ISpansInputValues } from '../../../interfaces/spans'

export const getSpanValues = ({
  bigMagnitude,
  smallMagnitude,
  maxChunks,
  spans = []
}: ISpansInputValues): number[] => {
  if (smallMagnitude >= bigMagnitude) {
    return [...spans, bigMagnitude]
  }

  const newBigMagnitude = bigMagnitude / maxChunks

  return getSpanValues({
    smallMagnitude,
    maxChunks,
    bigMagnitude: newBigMagnitude,
    spans: [...spans, newBigMagnitude]
  })
}

export const getSmallMagnitudeChunkSize = (
  bigMagnitude: number,
  maxChunks: number
) => bigMagnitude / maxChunks / maxChunks

export const hasFractionalPart = (value: number) => value % 1 !== 0

export const getRoundedUpNumChunks = (value: number) =>
  hasFractionalPart(value) ? Math.ceil(value) : value

export const getChunks = (numChunks: number) => {
  return range(numChunks).map(() => Runes.chunk)
}

export const getMagnitudesAndNames = (
  span1Magnitude,
  span2Magnitude,
  span1Name,
  span2Name
) => {
  const bigMagnitude = Math.max(span1Magnitude, span2Magnitude)
  const smallMagnitude = Math.min(span1Magnitude, span2Magnitude)
  const smallMagnitudeName =
    smallMagnitude === span1Magnitude ? span1Name : span2Name
  const bigMagnitudeName =
    smallMagnitude === span1Magnitude ? span2Name : span1Name
  return {
    bigMagnitude,
    bigMagnitudeName,
    smallMagnitude,
    smallMagnitudeName
  }
}
