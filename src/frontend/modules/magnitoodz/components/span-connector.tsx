import * as React from 'react'
import { maxChunks } from '../../../components/ui'

export const SpanConnector: React.SFC<any> = () => {
  return (
    <div className="ml4 mt0 mb0 bt0 mid-gray b">
      <span>|</span>
      <br />
      <span>| magnified x {maxChunks}</span>
      <br />
      <span>|</span>
    </div>
  )
}
