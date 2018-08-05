import * as React from 'react'

interface IProps {
  color: string
  chunkSize: number
  unit?: string
}

export const DashTranslation: React.SFC<IProps> = ({
  color,
  chunkSize,
  unit
}) => {
  return (
    <span>
      <span className={color}>-</span>
      <span>
        {' '}
        equals {(chunkSize / 100).toLocaleString()} {unit && unit}{' '}
      </span>
    </span>
  )
}
