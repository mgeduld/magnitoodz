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
    <p className="b i">
      {magnitudeName && <span>{magnitudeName} </span>}
      <span>{magnitude.toLocaleString()} </span>
      {unit && <span>{unit}</span>}
    </p>
  )
}
