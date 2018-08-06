import * as React from 'react'
import { SpanLabel } from './span-label'
import { MagnitoodSpan } from './magnitood-span'
import { hasFractionalPart } from '../utils/spans'
import { FinalChunk } from '../enums/chunk'

interface IProps {
  numChunks: number
  maxChunks: number
  smallMagnitude: number
  smallMagnitudeName?: string
  unit?: string
  color: string
}

export const FinalSpan: React.SFC<IProps> = ({
  numChunks,
  smallMagnitude,
  smallMagnitudeName,
  unit,
  color
}) => {
  const wholeNumChunks = Math.ceil(numChunks)
  return (
    <div className="mt3 mb0 bg-near-black pa2">
      <SpanLabel
        magnitude={smallMagnitude}
        magnitudeName={smallMagnitudeName}
        unit={unit}
      />
      <MagnitoodSpan
        chunks={wholeNumChunks}
        last={hasFractionalPart(numChunks) ? FinalChunk.dim : FinalChunk.normal}
        color={color}
      />
    </div>
  )
}
