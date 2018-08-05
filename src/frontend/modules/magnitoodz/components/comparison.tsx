import * as React from 'react'
import { MagnificationKey } from './magnification-key'
import { getChunks } from '../utils/spans'
import { Runes } from '../enums/runes'

interface IProps {
  maxChunks: number
  bigChunkSize: number
  smallChunkSize: number
  unit?: string
  smallMagnitudeColor?: string
  index?: number
  smallMagnitudeChunkSize: number
  smallMagnitude: number
}

export const Comparison: React.SFC<IProps> = ({
  maxChunks,
  bigChunkSize,
  unit = '',
  smallMagnitudeColor = 'green',
  index = 0,
  smallMagnitude,
  smallMagnitudeChunkSize
}) => {
  const showMagnification = smallMagnitude < smallMagnitudeChunkSize
  return (
    <div className="mt0 mb0" key={index}>
      <div className="mid-gray">
        {Runes.head}
        {getChunks(maxChunks)}
        {Runes.tail}
      </div>
      <div className="mt0 mb0">
        <span className={smallMagnitudeColor}>{getChunks(maxChunks)}</span>
        <br />
        <MagnificationKey
          showMagnification={showMagnification}
          color={smallMagnitudeColor}
          bigMagnitude={bigChunkSize}
          maxChunks={maxChunks}
          unit={unit}
        />
      </div>
    </div>
  )
}
