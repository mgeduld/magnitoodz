import * as React from 'react'

interface IProps {
  magnitudeName?: string
  unit?: string
  magnitude: number
}

export const SpanLabel: React.SFC<IProps> = ({
  magnitudeName,
  magnitude,
  unit
}) => {
  return (
    <div className="b i mb0 mt0">
      {magnitudeName && <span>{magnitudeName} </span>}
      <span>{magnitude.toLocaleString()} </span>
      {unit && <span>{unit}</span>}
    </div>
  )
}
