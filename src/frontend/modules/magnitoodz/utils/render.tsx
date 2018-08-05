import * as React from 'react'
import { Comparison, FinalSpan } from '../components'

import {
  getPecentOfBiggerMagnitude,
  getNumChuncks,
  getRoundedUpNumChunks,
  getCurrentColor,
  getBigMagnitudeChunckSize,
  shouldRenderFinalSpan,
  getNextColor,
  getSmallMagnitudeChunkSize
} from './spans'
import { colors } from '../colors'

export const renderSmallMagnitude = ({
  bigMagnitude,
  smallMagnitude,
  smallMagnitudeName,
  maxChunks,
  unit,
  spans = [],
  key = 0
}) => {
  const smallPercent = getPecentOfBiggerMagnitude(smallMagnitude, bigMagnitude)
  const numChunks = getNumChuncks(smallPercent, maxChunks)
  const wholeNumChunks = getRoundedUpNumChunks(numChunks)
  const currentColor = getCurrentColor(colors, spans)
  const chunkSize = getBigMagnitudeChunckSize(bigMagnitude, maxChunks)
  if (shouldRenderFinalSpan(smallMagnitude, bigMagnitude, maxChunks)) {
    return [
      ...spans,
      <FinalSpan
        key={key}
        color={currentColor}
        numChunks={numChunks}
        maxChunks={maxChunks}
        smallMagnitude={smallMagnitude}
        smallMagnitudeName={smallMagnitudeName}
        unit={unit}
      />
    ]
  }
  const soFar = [
    ...spans,
    <Comparison
      key={key}
      bigChunkSize={chunkSize}
      smallChunkSize={wholeNumChunks}
      unit={unit}
      maxChunks={maxChunks}
      smallMagnitudeColor={getNextColor(colors, spans)}
      smallMagnitude={smallMagnitude}
      smallMagnitudeChunkSize={getSmallMagnitudeChunkSize(
        bigMagnitude,
        maxChunks
      )}
    />
  ]
  return renderSmallMagnitude({
    smallMagnitude,
    smallMagnitudeName,
    maxChunks,
    unit,
    bigMagnitude: chunkSize,
    spans: soFar,
    key: key + 1
  })
}
