import * as React from 'react'
import { SpanLabel } from './span-label'
import { MagnitoodSpan } from './magnitood-span'

interface IProps {
  bigMagnitude: number
  bigMagnitudeName: string
  unit?: string
  maxChunks: number
  colors: string[]
}

export const BigMagnitudeSpan: React.SFC<IProps> = ({
  bigMagnitude,
  bigMagnitudeName,
  unit,
  maxChunks,
  colors
}) => {
  return (
    <div className="bg-near-black pa2 mb0">
      <SpanLabel
        magnitude={bigMagnitude}
        magnitudeName={bigMagnitudeName}
        unit={unit}
      />
      <MagnitoodSpan
        chunks={maxChunks}
        color={colors[0]}
        highlightColor={colors[1]}
      />
    </div>
  )
}
