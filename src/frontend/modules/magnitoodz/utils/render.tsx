import * as React from 'react'
import { Comparison, FinalSpan } from '../components'
import { getSmallMagnitudeChunkSize, getMagnitudes } from './spans'
import { colors } from '../../../constants/colors'
import { DashTranslation } from '../components/dash-translation'

export const renderSmallMagnitude = ({
  bigMagnitude,
  smallMagnitude,
  smallMagnitudeName,
  maxChunks,
  unit
}) => {
  const magnitudes = getMagnitudes({ bigMagnitude, smallMagnitude, maxChunks })
  const finalIndex = magnitudes.length - 1
  const noMagnificationLength = 2
  return magnitudes.map((chunkSize: number, index: number) => {
    if (index === finalIndex) {
      return (
        <FinalSpan
          key={index}
          color={
            magnitudes.length === noMagnificationLength
              ? 'white'
              : colors[index]
          }
          numChunks={smallMagnitude / chunkSize}
          maxChunks={maxChunks}
          smallMagnitude={smallMagnitude}
          smallMagnitudeName={smallMagnitudeName}
          unit={unit}
        />
      )
    }
    return magnitudes.length > noMagnificationLength ? (
      <Comparison
        key={index}
        bigChunkSize={chunkSize}
        unit={unit}
        maxChunks={maxChunks}
        smallMagnitudeColor={colors[index + 1]}
        smallMagnitude={smallMagnitude}
        smallMagnitudeChunkSize={getSmallMagnitudeChunkSize(
          bigMagnitude,
          maxChunks
        )}
      />
    ) : (
      <DashTranslation
        key={index}
        color="white"
        unit={unit}
        chunkSize={chunkSize}
      />
    )
  })
}
