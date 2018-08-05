import * as React from 'react'
import { range } from 'lodash'
import { Runes } from '../enums/runes'
import 'tachyons/css/tachyons.css'

interface IProps {
  chunks: number
  bigChunkSize: number
  smallChunkSize: number
  unit?: string
  comparisonColor?: string
  bigMagnituteColor?: string
  smallMagnitudeColor?: string
  index?: number
  smallMagnitudeChunkSize: number
  smallMagnitude: number
}

export const Comparison: React.SFC<IProps> = ({
  chunks,
  bigChunkSize,
  unit = '',
  comparisonColor = 'white',
  bigMagnituteColor = 'red',
  smallMagnitudeColor = 'green',
  index = 0,
  smallMagnitude,
  smallMagnitudeChunkSize
}) => {
  const showMagnification = smallMagnitude < smallMagnitudeChunkSize
  return (
    <div className="ml4 mt0 mb0" key={index}>
      <div className="mid-gray">
        |{range(chunks - 2).map((chunk) => Runes.chunk)}|
      </div>
      <div className="mt0 mb0">
        <span className={smallMagnitudeColor}>
          {range(chunks).map((chunk) => Runes.chunk)}
        </span>
        <br />
        <p className="ml4 mb0 bt0">
          <span className={smallMagnitudeColor}>-</span> equals{' '}
          {(bigChunkSize / 100).toLocaleString()} {unit && unit}
        </p>
        {showMagnification && (
          <p className="ml4 mt0 mb0 bt0">
            <span className="mid-gray b">|</span>
            <br />
            <span className="mid-gray b">| magnified x 100</span>
            <br />
            <span className="mid-gray b">|</span>
          </p>
        )}
      </div>
    </div>
  )
}
