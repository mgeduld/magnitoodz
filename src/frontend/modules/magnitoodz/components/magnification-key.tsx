import * as React from 'react'
import { DashTranslation } from './dash-translation'
import { SpanConnector } from './span-connector'

interface IProps {
  classes?: string
  bigMagnitude: number
  maxChunks: number
  unit?: string
  color?: string
  showMagnification?: boolean
}

export const MagnificationKey: React.SFC<IProps> = ({
  classes,
  bigMagnitude,
  maxChunks,
  unit,
  color = 'white',
  showMagnification = true
}) => {
  const resolvedClasses = classes ? classes : 'ml5 mb0'
  return (
    <div className={resolvedClasses}>
      <DashTranslation color={color} chunkSize={bigMagnitude} unit={unit} />
      {showMagnification && <SpanConnector />}
    </div>
  )
}
