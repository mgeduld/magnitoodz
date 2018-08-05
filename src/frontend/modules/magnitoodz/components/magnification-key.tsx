import * as React from 'react'
import { DashTranslation } from './dash-translation'
import { SpanConnector } from './span-connector'

interface IProps {
  bigMagnitude: number
  maxChunks: number
  unit?: string
  color?: string
  showMagnification?: boolean
}

export const MagnificationKey: React.SFC<IProps> = ({
  bigMagnitude,
  maxChunks,
  unit,
  color = 'white',
  showMagnification = true
}) => {
  return (
    <div className="ml5 mb0">
      <DashTranslation
        color={color}
        chunkSize={bigMagnitude / maxChunks}
        unit={unit}
      />
      {showMagnification && <SpanConnector />}
    </div>
  )
}
