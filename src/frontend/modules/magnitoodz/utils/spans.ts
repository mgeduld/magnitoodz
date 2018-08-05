import { range } from 'lodash'
import { Runes } from '../enums/runes'

export const getBigMagnitudeChunckSize = (
  bigMagnitude: number,
  maxChunks: number
) => bigMagnitude / maxChunks

export const getSmallMagnitudeChunkSize = (
  bigMagnitude: number,
  maxChunks: number
) => bigMagnitude / maxChunks / maxChunks

export const getCurrentColor = (colors: string[], spans: any[]) =>
  colors[spans.length]

export const getNextColor = (colors: string[], spans: any[]) =>
  colors[spans.length + 1]

export const getPecentOfBiggerMagnitude = (
  smallMagnitude: number,
  bigMagnitude: number
) => smallMagnitude / bigMagnitude

export const getNumChuncks = (percent: number, maxChunks: number) =>
  percent * maxChunks

export const hasFractionalPart = (value: number) => value % 1 !== 0

export const getRoundedUpNumChunks = (value: number) =>
  hasFractionalPart(value) ? Math.ceil(value) : value

export const isSmallMagnitudeAtomic = (
  smallMagnitude: number,
  chunkSize: number
) => smallMagnitude >= chunkSize

export const shouldRenderFinalSpan = (
  smallMagnitude: number,
  bigMagnitude: number,
  maxChunks: number
) => {
  const chunkSize = getBigMagnitudeChunckSize(bigMagnitude, maxChunks)
  return isSmallMagnitudeAtomic(smallMagnitude, chunkSize)
}

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
